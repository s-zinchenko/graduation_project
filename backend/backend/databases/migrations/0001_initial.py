# Generated by Django 5.0.2 on 2024-02-20 10:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Database',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, unique=True, verbose_name='Название (кириллица)')),
                ('name', models.CharField(max_length=128, unique=True, verbose_name='Название (латиница)')),
                ('description', models.TextField(verbose_name='Описание базы данных')),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'База данных',
                'verbose_name_plural': 'Базы данных',
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, verbose_name='Отображаемое название')),
                ('name', models.CharField(max_length=128, verbose_name='Внутреннее имя')),
                ('description', models.TextField(verbose_name='Описание таблицы')),
                ('database', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='databases.database', verbose_name='База данных')),
            ],
            options={
                'verbose_name': 'Таблица',
                'verbose_name_plural': 'Таблицы',
            },
        ),
        migrations.CreateModel(
            name='Prop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_key', models.BooleanField(default=False, verbose_name='Поле является первичным ключем?')),
                ('name', models.CharField(max_length=128, verbose_name='Имя')),
                ('type', models.CharField(max_length=128, verbose_name='Тип')),
                ('description', models.TextField(verbose_name='Описание')),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='databases.table', verbose_name='Таблица')),
            ],
            options={
                'verbose_name': 'Свойство',
                'verbose_name_plural': 'Свойства',
            },
        ),
        migrations.CreateModel(
            name='TableRelationParticipant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='databases.prop', verbose_name='Поле')),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='databases.table', verbose_name='Таблица')),
            ],
            options={
                'verbose_name': 'Участник отношения',
                'verbose_name_plural': 'Участники отношений',
            },
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=128, verbose_name='Тип')),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='source', to='databases.tablerelationparticipant', verbose_name='Источник')),
                ('target', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target', to='databases.tablerelationparticipant', verbose_name='Цель')),
            ],
            options={
                'verbose_name': 'Отношение',
                'verbose_name_plural': 'Отношения',
            },
        ),
    ]
