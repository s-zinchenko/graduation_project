from django.conf import settings

from backend.user.models import LazyUser, User


def is_lazy_user(user: User) -> bool:
    if user.is_anonymous:
        return False

    backend = getattr(user, "backend", None)
    if backend == settings.LAZY_SIGNUP_BACKEND:
        return True

    if LazyUser.objects.filter(user=user).exists():
        return True

    return False
