import logging
import os

import environ
from django.db.models.fields import BigAutoField
from django.forms import ChoiceField, FileField, JSONField
from django.utils.functional import SimpleLazyObject
from marshmallow import fields

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)

VERSION = "0.0.1"
env = environ.Env()
environ.Env.read_env(env.str("ENV_PATH", ".env"))

DEBUG = env("DEBUG", default=False)

SECRET_KEY = env.str("SECRET_KEY", default="my-secret-key")

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = []

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

PROJECT_APPS = [
    "backend.user",
]


INSTALLED_APPS += PROJECT_APPS


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.application.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.application.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env.str("DATABASE_NAME", default=""),
        "USER": env.str("DATABASE_USER", default=""),
        "PASSWORD": env.str("DATABASE_PASSWORD", default=""),
        "HOST": env.str("DATABASE_HOST", default="127.0.0.1"),
        "PORT": env.int("DATABASE_PORT", default="5432"),
        "TEST": {"CHARSET": "UTF8", "TEMPLATE": "template0"},
    },
}


AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"  # noqa: E501
    },
]

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
)


AUTH_USER_MODEL = "user.User"

LANGUAGE_CODE = "ru-RU"
TIME_ZONE = "Europe/Moscow"

USE_I18N = True
USE_L10N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

STATIC_URL = "/dj_static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

if not DEBUG:
    if env.bool("LOGGING_PATH", default=False):
        LOGGING = {
            "version": 1,
            "disable_existing_loggers": True,
            "formatters": {
                "verbose": {
                    "format": "LEVEL:%(levelname)s "
                    "TIME:%(asctime)s MESSAGE:%(message)s"
                },
            },
            "handlers": {
                "file": {
                    "level": "INFO",
                    "class": "logging.FileHandler",
                    "filename": env.str("LOGGING_PATH"),
                    "formatter": "verbose",
                }
            },
            "loggers": {
                "django": {
                    "handlers": ["file"],
                    "level": "INFO",
                    "propagate": True,
                }
            },
        }
else:
    logging.basicConfig(level=logging.DEBUG)

TESTS_DATA_DIR = os.path.join(BASE_DIR, "tests", "data")


def get_serializer_form_field() -> dict:
    return {
        BigAutoField: fields.Integer,
        FileField: fields.Str,
        ChoiceField: fields.Str,
        JSONField: fields.Raw,
    }


SERIALIZER_FORM_FIELD_MAPPING = SimpleLazyObject(get_serializer_form_field)

DEBUG_TOKEN = env("DEBUG_TOKEN", default="abcd")

EXTERNAL_TOKEN = env("EXTERNAL_TOKEN", default="FIXME")

FRONT_URL = env("FRONT_URL", default="localhost")

ATTACHMENT_LOAD_PREFIX = env("ATTACHMENT_LOAD_PREFIX", default="media")

MAX_NEGATIVE_RATE = env("MAX_NEGATIVE_RATE", default=3)
MAX_PHOTO_LENGTH = env("MAX_PHOTO_LENGTH", default=15)

# CELERY SETTINGS
CELERY_BROKER_URL = env.str("CELERY_BROKER_URL", default="amqp://localhost")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers.DatabaseScheduler"
MAX_SEND_NOTIFICATION_RETRIES = env.str(
    "MAX_SEND_NOTIFICATION_RETRIES", default=2
)
CELERY_TIMEZONE = "Europe/Moscow"
