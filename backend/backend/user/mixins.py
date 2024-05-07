from django.contrib.auth import SESSION_KEY, authenticate, login

from backend.user.models import LazyUser


class LazyLoginMixin:
    def perform_request_pipelines(self, *args, **kwargs) -> None:
        if self.request.user.is_anonymous:
            user, username = LazyUser.objects.create_lazy_user()
            self.request.user = None
            user = authenticate(username=username)
            self.request.session[SESSION_KEY] = user.id
            login(self.request, user)
        super().perform_request_pipelines(*args, **kwargs)
