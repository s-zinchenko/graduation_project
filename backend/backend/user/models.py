# type: ignore
import uuid
from typing import Dict

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(
        self, username: str, password: str, **extra_fields: Dict
    ) -> AbstractBaseUser:
        """
        Create and save a user with the given username, email, and password.
        """
        username = self.normalize_email(username)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(
        self, username: str = None, password: str = None, **extra_fields
    ) -> AbstractBaseUser:
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(
        self, username: str, password: str, **extra_fields
    ) -> AbstractBaseUser:
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    username = models.CharField(max_length=128, verbose_name="Логин", unique=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_(
            "Designates whether the user can log " "into this admin site."
        ),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    is_teacher = models.BooleanField(default=False, verbose_name="Преподаватель")
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    inviter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        verbose_name="Пригласивший",
        null=True,
        blank=True,
    )
    email = models.CharField(verbose_name="Email", null=True, blank=True)

    USERNAME_FIELD = "username"

    def __str__(self) -> str:
        return f"{self.id}: {self.username}"


class LazyUserManager(models.Manager):
    def __hash__(self):
        """
        Implemented so signal can be sent in .convert() for Django 1.8
        """
        return hash(str(self))

    user_model = get_user_model()
    username_field = user_model.USERNAME_FIELD

    def create_lazy_user(self):
        user_class = self.user_model
        username = self.generate_username(user_class)
        user = user_class.objects.create_user(username, "")
        self.create(user=user)
        return user, username

    def generate_username(self, user_class):
        max_length = user_class._meta.get_field(self.username_field).max_length
        return uuid.uuid4().hex[:max_length]


class LazyUser(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    created = models.DateTimeField(default=timezone.now)
    objects = LazyUserManager()

    def __str__(self):
        return "{0}:{1}".format(self.user, self.created)


class InviteLink(models.Model):
    class Meta:
        verbose_name = "Ссылка для регистрации"
        verbose_name_plural = "Ссылки для регистрации"

    code = models.CharField(max_length=64, unique=True, verbose_name="Ссылка для приглашения")
    is_active = models.BooleanField(default=True)
    created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Ссылка {self.code} пользователя {self.author_id}"
