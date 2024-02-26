from django.urls import path

from backend.databases.views import DatabasesListView

urlpatterns = [
    path("list", DatabasesListView.as_view()),
]
