from typing import Any

from django.core.handlers.wsgi import WSGIRequest
from django.shortcuts import render
from django_serializer.v2.views import ApiView, HttpMethod

from backend.databases.models import Database
from backend.databases.serializers import DatabasesListSerializer


class DatabasesListView(ApiView):
    class Meta:
        tags = ["databases"]
        method = HttpMethod.GET
        serializer = DatabasesListSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> dict:
        databases = Database.objects.prefetch_related("table_set__prop_set").all()
        return {"items": databases}
