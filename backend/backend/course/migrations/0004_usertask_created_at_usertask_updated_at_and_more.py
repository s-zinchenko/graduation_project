# Generated by Django 5.0.2 on 2024-04-18 20:02

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0003_practicaltask_author_usertask_user_solution'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='usertask',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='Дата и время создания'),
        ),
        migrations.AddField(
            model_name='usertask',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='Дата и время обновления'),
        ),
        migrations.AlterField(
            model_name='practicaltask',
            name='author',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Автор'),
        ),
    ]
