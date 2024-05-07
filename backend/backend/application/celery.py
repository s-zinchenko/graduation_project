import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "backend.application.settings",
)

app = Celery("application")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


app.conf.beat_schedule = {
    'cleanup_session': {
        'task': 'backend.databases.tasks.cleanup_session',
        'schedule': crontab(minute="1"),
    },
}