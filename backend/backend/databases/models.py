from django.db import models


class Database(models.Model):
    class Meta:
        verbose_name = "База данных"
        verbose_name_plural = "Базы данных"

    title = models.CharField(max_length=128, verbose_name="Название (кириллица)", unique=True)
    name = models.CharField(max_length=128, verbose_name="Название (латиница)", unique=True)
    description = models.TextField(verbose_name="Описание базы данных")
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"База данных {self.title}"


class Table(models.Model):
    class Meta:
        verbose_name = "Таблица"
        verbose_name_plural = "Таблицы"

    title = models.CharField(max_length=128, verbose_name="Отображаемое название")
    name = models.CharField(max_length=128, verbose_name="Внутреннее имя")
    description = models.TextField(verbose_name="Описание таблицы")
    database = models.ForeignKey("databases.Database", on_delete=models.CASCADE, verbose_name="База данных")

    def __str__(self) -> str:
        return f"Таблица {self.title} (база данных: {self.name})"


class Prop(models.Model):
    class Meta:
        verbose_name = "Свойство"
        verbose_name_plural = "Свойства"

    is_key = models.BooleanField(default=False, verbose_name="Поле является первичным ключем?")
    name = models.CharField(max_length=128, verbose_name="Имя")
    type = models.CharField(max_length=128, verbose_name="Тип")
    description = models.TextField(verbose_name="Описание")
    table = models.ForeignKey("databases.Table", on_delete=models.CASCADE, verbose_name="Таблица")

    def __str__(self) -> str:
        return f"Поле {self.name} (таблица: {self.table})"


class Relation(models.Model):
    class Meta:
        verbose_name = "Отношение"
        verbose_name_plural = "Отношения"

    source = models.ForeignKey("databases.TableRelationParticipant", related_name="source", on_delete=models.CASCADE, verbose_name="Источник")
    target = models.ForeignKey("databases.TableRelationParticipant", related_name="target", on_delete=models.CASCADE, verbose_name="Цель")
    type = models.CharField(max_length=128, verbose_name="Тип")
    database = models.ForeignKey("databases.Database", on_delete=models.CASCADE, verbose_name="База данных", null=True)


class TableRelationParticipant(models.Model):
    class Meta:
        verbose_name = "Участник отношения"
        verbose_name_plural = "Участники отношений"

    table = models.ForeignKey("databases.Table", on_delete=models.CASCADE, verbose_name="Таблица")
    field = models.ForeignKey("databases.Prop", on_delete=models.CASCADE, verbose_name="Поле")
