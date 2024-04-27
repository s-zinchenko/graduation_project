from django.urls import path

from backend.user.views import UserLoginView, UserRegistrationView, UserCurrentView, UserStatView

urlpatterns = [
    path("login", UserLoginView.as_view()),
    path("registration", UserRegistrationView.as_view()),
    path("current", UserCurrentView.as_view()),
    path("stats", UserStatView.as_view()),
]