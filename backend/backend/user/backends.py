from typing import Any, Optional

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.core.handlers.wsgi import WSGIRequest

from backend.user.models import User


class LazySignupBackend(ModelBackend):
    user_class = get_user_model()

    def authenticate(
        self,
        request: WSGIRequest,
        username: Optional[str] = None,
        password: Optional[str] = None,
        **kwargs: Any,
    ) -> Optional[User]:
        try:
            return self.user_class.objects.get(
                **{self.user_class.USERNAME_FIELD: username}
            )
        except self.user_class.DoesNotExist:
            return None

    def get_user(self, user_id: int) -> Optional[User]:
        try:
            user = self.user_class.objects.get(pk=user_id)
        except self.user_class.DoesNotExist:
            user = None
        else:
            user.backend = "equalt.application.backends.LazySignupBackend"
        return user
