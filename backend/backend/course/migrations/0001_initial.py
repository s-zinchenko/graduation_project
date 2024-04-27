# Generated by Django 5.0.2 on 2024-04-16 18:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('databases', '0005_database_author'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PracticalTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField(verbose_name='Задание')),
                ('result_format_hint', models.TextField(null=True, verbose_name='Формат результата(Подсказка)')),
                ('extra_hint', models.TextField(null=True, verbose_name='Дополнительная подсказка')),
                ('solution', models.TextField(verbose_name='Решение')),
                ('task_order', models.IntegerField(verbose_name='Порядок задания')),
                ('task_type', models.CharField(choices=[('dml', 'Dml'), ('select', 'Select')], max_length=128, verbose_name='Тип задания')),
                ('difficulty', models.CharField(choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')], max_length=128, verbose_name='Сложность задания')),
                ('result', models.JSONField(blank=True, null=True, verbose_name='Результат')),
                ('database', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='databases.database', verbose_name='База данных')),
            ],
            options={
                'verbose_name': 'Практическое задание',
                'verbose_name_plural': 'Практические задания',
            },
        ),
        migrations.CreateModel(
            name='UserTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('not_started', 'Not Started'), ('in_progress', 'In Progress'), ('completed', 'Completed')], max_length=128, verbose_name='Статус')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.practicaltask', verbose_name='Задание')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Задание пользователя',
                'verbose_name_plural': 'Задания пользователя',
            },
        ),
    ]