"""
Celery application configuration for background tasks.
"""
from celery import Celery
from celery.schedules import crontab
from app.config import settings

# Create Celery instance
celery_app = Celery(
    "encore",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
    include=["app.worker.tasks"]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000,
)

# Periodic tasks configuration
celery_app.conf.beat_schedule = {
    "check-streak-freezes": {
        "task": "app.worker.tasks.check_streak_freezes",
        "schedule": crontab(hour=0, minute=5),  # Run daily at 00:05 UTC
    },
    "send-reminder-notifications": {
        "task": "app.worker.tasks.send_reminder_notifications",
        "schedule": crontab(hour="*/4"),  # Run every 4 hours
    },
}
