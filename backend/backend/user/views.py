from typing import Any

from django.contrib.auth import login, authenticate
from django.contrib.auth.hashers import make_password
from django.core.handlers.wsgi import WSGIRequest
from django.db import IntegrityError
from django_serializer.v2.exceptions import NotFoundError
from django_serializer.v2.serializer import Serializer
from django_serializer.v2.views import ApiView, HttpMethod

from backend.user.errors import UnauthorizedError, NotUniqueUsernameError
from backend.user.forms import UsernamePasswordForm, UsernameForm
from backend.user.models import User
from backend.user.serializers import UserSerializer


class UserLoginView(ApiView):
    class Meta:
        tags = ["user"]
        method = HttpMethod.POST
        body_form = UsernamePasswordForm
        serializer = Serializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> User:
        a = User.objects.first()
        user = authenticate(
            request,
            username=self.request_body["username"],
            password=self.request_body["password"]
        )
        if not user:
            raise UnauthorizedError

        login(request, user)
        return user


class UserRegistrationView(ApiView):
    class Meta:
        tags = ["user"]
        method = HttpMethod.POST
        body_form = UsernamePasswordForm
        serializer = UserSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> User:
        try:
            user = User.objects.create_user(
                username=self.request_body["username"],
                password=self.request_body["password"]
            )
        except IntegrityError:
            raise NotUniqueUsernameError

        login(request, user)
        return user


class UserCurrentView(ApiView):
    class Meta:
        tags = ["user"]
        method = HttpMethod.GET
        query_form = UsernameForm
        serializer = UserSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> User:
        user = User.objects.filter(
            username=self.request_query["username"],
        ).first()
        if not user:
            raise NotFoundError

        return user
