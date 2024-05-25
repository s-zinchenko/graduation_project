from typing import Any

from django.contrib.auth import login, authenticate
from django.contrib.auth.hashers import make_password
from django.core.handlers.wsgi import WSGIRequest
from django.db import IntegrityError
from django.db.models import Count
from django.db.models.functions import ExtractDay
from django.forms import Form
from django_serializer.v2.exceptions import NotFoundError
from django_serializer.v2.serializer import Serializer
from django_serializer.v2.views import ApiView, HttpMethod

from backend.course.models import UserTask
from backend.user.errors import UnauthorizedError, NotUniqueUsernameError
from backend.user.forms import UsernamePasswordForm, UsernameForm, UserRegistrationForm
from backend.user.mixins import LazyLoginMixin
from backend.user.models import User, InviteLink
from backend.user.serializers import UserSerializer, UserStatSerializer
from backend.user.utils import is_lazy_user


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

        login(request, user, backend="django.contrib.auth.backends.ModelBackend")
        return user


class UserRegistrationView(ApiView):
    class Meta:
        tags = ["user"]
        method = HttpMethod.POST
        query_form = UserRegistrationForm
        body_form = UsernamePasswordForm
        serializer = UserSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> User:
        inviter_id = None
        if self.request_query.get("link"):
            invite_link = InviteLink.objects.filter(code=self.request_query["link"], is_active=True).first()
            if not invite_link:
                raise NotFoundError

            inviter_id = invite_link.author_id
        try:
            user = User.objects.create_user(
                username=self.request_body["username"],
                password=self.request_body["password"],
                inviter_id=inviter_id,
            )
        except IntegrityError:
            raise NotUniqueUsernameError

        login(request, user, backend="django.contrib.auth.backends.ModelBackend")
        return user


class UserCurrentView(LazyLoginMixin, ApiView):
    class Meta:
        tags = ["user"]
        method = HttpMethod.GET
        # query_form = UsernameForm
        serializer = UserSerializer

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> User:
        # user = User.objects.filter(
        #     username=self.request_query["username"],
        # ).first()
        # if not user:
        #     raise NotFoundError
        user = self.request.user
        user.is_lazy = is_lazy_user(user)
        return user


class UserStatView(ApiView):
    class Meta:
        tags = ["user"]
        method = HttpMethod.GET
        query_form = Form
        serializer = UserStatSerializer
        serializer_many = True

    def execute(self, request: WSGIRequest, *args: Any, **kwargs: Any) -> User:
        user_stats = UserTask.objects.filter(
            user_id=self.request.user.id,
            status=UserTask.Status.COMPLETED,
        ).values('updated_at').annotate(count=Count('id'))

        return user_stats
