from django.urls import path

from backend.databases.views import DatabasesListView, ExecuteQueryView, CheckUserDatabaseSessionView, \
    CreateUserDatabaseSessionView

urlpatterns = [
    path("list", DatabasesListView.as_view()),
    path("execute", ExecuteQueryView.as_view()),
    path("create_session", CreateUserDatabaseSessionView.as_view()),
    path("check_session", CheckUserDatabaseSessionView.as_view()),
]
