from django.conf import settings
from django.db import models


class PracticalTask(models.Model):
    class Meta:
        verbose_name = "Практическое задание"
        verbose_name_plural = "Практические задания"

    class Type(models.TextChoices):
        DML = "dml"
        SELECT = "select"

    class Difficulty(models.TextChoices):
        EASY = "1"
        MEDIUM = "2"
        HARD = "3"

    question = models.TextField(verbose_name="Задание")
    result_format_hint = models.TextField(verbose_name="Формат результата(Подсказка)", null=True)
    extra_hint = models.TextField(verbose_name="Дополнительная подсказка", null=True)
    solution = models.TextField(verbose_name="Решение")
    task_order = models.IntegerField(verbose_name="Порядок задания")
    task_type = models.CharField(max_length=128, verbose_name="Тип задания", choices=Type.choices)
    difficulty = models.CharField(max_length=128, verbose_name="Сложность задания", choices=Difficulty.choices)
    database = models.ForeignKey("databases.Database", on_delete=models.CASCADE, verbose_name="База данных")
    result = models.JSONField(verbose_name="Результат", null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Автор", null=True, blank=True)

    def __str__(self):
        return self.question


class UserTask(models.Model):
    class Meta:
        verbose_name = "Задание пользователя"
        verbose_name_plural = "Задания пользователя"

    class Status(models.TextChoices):
        NOT_STARTED = "not_started"
        IN_PROGRESS = "in_progress"
        COMPLETED = "completed"

    task = models.ForeignKey("course.PracticalTask", on_delete=models.CASCADE, verbose_name="Задание")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Пользователь")
    status = models.CharField(max_length=128, verbose_name="Статус", choices=Status.choices)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата и время создания", null=True)
    updated_at = models.DateField(verbose_name="Дата и время обновления", null=True)
    user_solution = models.TextField(verbose_name="Решение пользователя", null=True, blank=True)
