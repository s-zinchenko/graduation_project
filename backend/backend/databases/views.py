import re
from typing import Any

from django.conf import settings
from django.core.handlers.wsgi import WSGIRequest
from django.utils import timezone
from django_serializer.v2.exceptions import NotFoundError
from django_serializer.v2.exceptions.http import ForbiddenError
from django_serializer.v2.serializer import Serializer
from django_serializer.v2.views import ApiView, HttpMethod

from backend.databases.form import DatabaseForm, ExecuteQueryForm
from backend.databases.models import Database, UserDatabaseSession
from backend.databases.serializers import DatabasesListSerializer, ExecuteQuerySerializer, \
    IsActiveSerializer
from backend.databases.tasks import cleanup_database
from backend.databases.utils import execute_query_at_sandbox, create_user_database
from backend.user.admin import User
from backend.user.mixins import LazyLoginMixin


class DatabasesListView(ApiView):
    class Meta:
        tags = ["databases"]
        method = HttpMethod.GET
        serializer = DatabasesListSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> dict:
        databases = Database.objects.prefetch_related("table_set__prop_set").all()
        return {"items": databases}


class CreateUserDatabaseSessionView(LazyLoginMixin, ApiView):
    class Meta:
        tags = ["databases"]
        method = HttpMethod.POST
        body_form = DatabaseForm
        serializer = Serializer

    def has_permissions(self, db: Database, user: User) -> bool:
        if db.author_id == user.inviter_id:
            return True

        return False

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> dict:
        database_id = self.request_body["database"]
        db = Database.objects.get(id=database_id)
        user_id = self.request.user.id
        if not self.has_permissions(db, self.request.user):
            raise ForbiddenError

        UserDatabaseSession.objects.create(
            user_id=user_id,
            database_id=database_id,
            expired_at=timezone.now() + timezone.timedelta(hours=settings.USER_DATABASE_SSESSION_ACTIVE_HOURS),
            operations_count=settings.USER_DATABASE_SSESSION_OPERATIONS_COUNT,
        )

        create_user_database(db.name, user_id)
        return {}


class ExecuteQueryView(LazyLoginMixin, ApiView):
    class Meta:
        tags = ["databases"]
        method = HttpMethod.POST
        body_form = ExecuteQueryForm
        serializer = ExecuteQuerySerializer

    def count_operations(self, raw_query: str):
        queries = raw_query.replace(";\n", ";").split(";")
        query = queries[len(queries) - 2] if len(queries) > 1 else raw_query
        operations_count = 1

        insert_query_regex = re.compile(r'(?i)\bINSERT\s+INTO\s+\w+\s*\(.*\)\s*VALUES\s*\(.*\)\s*')
        matches = insert_query_regex.match(query)
        if matches:
            values_arrays = query.partition("VALUES")[2].split("),")
            operations_count = len(values_arrays)

        return operations_count

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> dict:
        database_id = self.request_body["database"]
        user_id = self.request.user.id
        query = self.request_body["query"]

        operations_count = self.count_operations(query)

        session = UserDatabaseSession.objects.filter(
            user_id=user_id,
            database_id=database_id,
            expired_at__gte=timezone.now(),
            operations_count__gte=operations_count,
        ).first()
        if not session:
            raise NotFoundError()

        session.operations_count -= operations_count
        session.save()
        db_name = Database.objects.get(id=database_id).name
        query_result = execute_query_at_sandbox(f"{db_name}_{user_id}", query)
        return query_result


class CheckUserDatabaseSessionView(LazyLoginMixin, ApiView):
    class Meta:
        tags = ["databases"]
        method = HttpMethod.POST
        body_form = DatabaseForm
        serializer = IsActiveSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> dict:
        session = UserDatabaseSession.objects.filter(
            user_id=self.request.user.id,
            database_id=self.request_body["database"],
            expired_at__gte=timezone.now(),
        ).first()

        if not session:
            is_active = False
        elif session.operations_count == 0:
            is_active = False
            cleanup_database(session)

        return {"is_active": is_active}


