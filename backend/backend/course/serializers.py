from django_serializer.v2.serializer import Serializer, ModelSerializer
from marshmallow import fields, pre_dump

from backend.course.models import PracticalTask, UserTask
from backend.databases.serializers import DatabasesListItemSerializer


class TaskItemSerializer(ModelSerializer):
    class SMeta:
        model = PracticalTask
        fields = ("id", "question", "difficulty", "task_order")

    database_name = fields.Str()
    is_solved = fields.Boolean()

    @pre_dump
    def prepare(self, obj, *args, **kwargs):
        obj.database_name = obj.database.name
        if obj.usertask_set.first() and obj.usertask_set.first().status == UserTask.Status.COMPLETED:
            obj.is_solved = True
        else:
            obj.is_solved = False

        return obj


class TaskDetailSerializer(ModelSerializer):
    class SMeta:
        model = PracticalTask
        fields = (
            "id",
            "question",
            "result_format_hint",
            "extra_hint",
            "task_order",
            "task_type",
            "difficulty",
        )

    database = fields.Nested(DatabasesListItemSerializer())


class TaskAnswerSerializer(Serializer):
    is_correct = fields.Boolean()
