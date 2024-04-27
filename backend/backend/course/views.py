from django.db import transaction
from django.db.models import Prefetch
from django.utils import timezone
from django_serializer.v2.exceptions import NotFoundError
from django_serializer.v2.exceptions.http import HttpError
from django_serializer.v2.views import ApiView, HttpMethod, GetApiView, CreateApiView

from backend.course.forms import TaskListForm, TaskAnswerForm
from backend.course.models import PracticalTask, UserTask
from backend.course.serializers import TaskItemSerializer, TaskDetailSerializer, TaskAnswerSerializer
from backend.databases.models import UserDatabaseSession
from backend.databases.utils import execute_query_at_sandbox
from backend.user.mixins import LazyLoginMixin


class TasksListView(LazyLoginMixin, ApiView):
    class Meta:
        method = HttpMethod.GET
        tags = ["course"]
        serializer = TaskItemSerializer
        serializer_many = True
        query_form = TaskListForm

    def execute(self, request, *args, **kwargs):
        task_extra_filters = {"usertask__status": self.request_query.get("status", "not_started")} if self.request_query.get("status") else {}
        order_by = self.request_query.get("order_by", "task_order")
        if task_type := self.request_query.get("type"):
            task_extra_filters["task_type"] = task_type
        if difficulty := self.request_query.get("difficulty"):
            task_extra_filters["difficulty"] = difficulty

        qs = (
            PracticalTask.objects.select_related("database")
            .prefetch_related(
                Prefetch(
                    "usertask_set",
                    queryset=UserTask.objects.filter(
                        user=request.user,
                    )
                )
            ).filter(**task_extra_filters).order_by(order_by)
        )
        return qs


class TaskDetailView(LazyLoginMixin, GetApiView):
    class Meta:
        model = PracticalTask
        method = HttpMethod.GET
        tags = ["course"]
        serializer = TaskDetailSerializer

    def get_object(self):
        m = self.Meta.model
        key: str = self.Meta.object_key
        return m.objects.select_related("database").get(**{key: self.request_query[key]})


class TaskAnswerView(LazyLoginMixin, ApiView):
    class Meta:
        tags = ["course"]
        method = HttpMethod.POST
        body_form = TaskAnswerForm
        serializer = TaskAnswerSerializer

    def execute(self, request, *args, **kwargs):
        is_correct = False
        practical_task = PracticalTask.objects.filter(id=self.request_body["practical_task_id"]).first()
        if not practical_task:
            raise HttpError(http_code=404, alias="not_found", description="Task not found")

        with transaction.atomic():
            user_task, created = UserTask.objects.get_or_create(
                user_id=request.user.id,
                task_id=practical_task.id,
                defaults={"status": UserTask.Status.IN_PROGRESS},
            )
            # if user_task.status == UserTask.Status.COMPLETED:
            #     raise HttpError(http_code=400, alias="bad_request", description="Task already completed")

            user_database_session = UserDatabaseSession.objects.filter(
                user_id=request.user.id,
                database_id=practical_task.database_id,
                expired_at__gte=timezone.now(),
                operations_count__gte=1,
            ).first()
            if not user_database_session:
                raise HttpError(http_code=404, alias="not_found", description="Session not found")

            if practical_task.task_type == PracticalTask.Type.DML:
                if practical_task.solution == self.request_body["answer"].lower():
                    is_correct = True
            elif practical_task.task_type == PracticalTask.Type.SELECT:
                correct_solution_tokens_set = set(practical_task.solution.lower().split())
                user_answer_tokens_set = set(self.request_body["answer"].lower().split())
                if correct_solution_tokens_set == user_answer_tokens_set:
                    query_result = execute_query_at_sandbox(f"{practical_task.database.name}_{request.user.id}", self.request_body["answer"])
                    if query_result == practical_task.result:
                        is_correct = True
            else:
                raise HttpError(http_code=400, alias="bad_request", description="Unknown task type")

            if is_correct:
                user_task.status = UserTask.Status.COMPLETED
                user_task.user_solution = self.request_body["answer"].lower()
                user_task.updated_at = timezone.now()
                user_task.save()
                user_database_session.operations_count -= 1
                user_database_session.save()

        return {"is_correct": is_correct}
