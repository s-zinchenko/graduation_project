import logging

import psycopg2
from celery import shared_task
from django.db.models import Q
from django.utils import timezone

from backend.databases.models import UserDatabaseSession


logger = logging.getLogger()


def cleanup_database(session: UserDatabaseSession):
    conn = psycopg2.connect(database="postgres", user="postgres", password="postgres", host="localhost", port="5432")
    conn.autocommit = True
    cur = conn.cursor()

    logger.info(f"drop database if exists {session.database.name}_{session.user_id};")
    cur.execute(f"drop database if exists {session.database.name}_{session.user_id};")
    conn.close()


@shared_task
def cleanup_session():
    old_sessions = UserDatabaseSession.objects.filter(Q(expired_at__lt=timezone.now()) | Q(operations_count=0))
    for session in old_sessions:
        logger.info(f"Starting cleanup database {session.database.name} for user {session.user_id}")
        cleanup_database(session)
        session.delete()
        logger.info(f"Cleanup finished database {session.database.name} for user {session.user_id}")

    logger.info(f"Cleanup {old_sessions.count()} sessions")
