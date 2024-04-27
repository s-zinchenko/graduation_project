# Generated by Django 5.0.2 on 2024-04-16 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='practicaltask',
            name='difficulty',
            field=models.CharField(choices=[('1', 'Easy'), ('2', 'Medium'), ('3', 'Hard')], max_length=128, verbose_name='Сложность задания'),
        ),
    ]