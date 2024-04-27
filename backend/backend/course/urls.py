from django.urls import path

from backend.course.views import TasksListView, TaskDetailView, TaskAnswerView

urlpatterns = [
    path("tasks", TasksListView.as_view()),
    path("task_detail", TaskDetailView.as_view()),
    path("answer", TaskAnswerView.as_view()),
]
