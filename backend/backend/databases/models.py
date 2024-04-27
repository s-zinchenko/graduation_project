from django.conf import settings
from django.db import models, transaction


class DatabaseManager(models.Manager):
    def create_database_from_schema(self, data: dict):
        with transaction.atomic():
            database = Database(
                title=data["title"],
                name=data["name"],
                description=data["description"],
                active=True
            )
            database.save()
            props = {}
            tables = {}
            for table_schema in data["tables"]:
                if table_schema["name"] == "alembic_version":
                    continue

                table = Table(
                    title=table_schema["title"],
                    name=table_schema["name"],
                    description=table_schema["description"],
                    database=database,
                )
                table.save()
                tables[table.name] = table
                props[table.name] = {}
                for prop in table_schema["props"]:
                    props[table.name][prop["name"]] = Prop(
                        is_key=prop["is_key"],
                        name=prop["name"],
                        type=prop["type"],
                        description=prop["description"],
                        table=table
                    )

                Prop.objects.bulk_create(props[table.name].values())

            relations = []
            for relation in data["relations"]:
                source = TableRelationParticipant(
                    table=tables[relation["source"]["table_name"]],
                    field=props[relation["source"]["table_name"]][relation["source"]["field_name"]],
                )
                source.save()
                target = TableRelationParticipant(
                    table=tables[relation["target"]["table_name"]],
                    field=props[relation["target"]["table_name"]][relation["target"]["field_name"]],
                )
                target.save()
                relations.append(
                    Relation(
                        type=relation["type"],
                        source=source,
                        target=target,
                    )
                )
            Relation.objects.bulk_create(relations)

        return database


class Database(models.Model):
    class Meta:
        verbose_name = "База данных"
        verbose_name_plural = "Базы данных"

    title = models.CharField(max_length=128, verbose_name="Название (кириллица)", unique=True)
    name = models.CharField(max_length=128, verbose_name="Название (латиница)", unique=True)
    description = models.TextField(verbose_name="Описание базы данных")
    active = models.BooleanField(default=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Создатель", null=True)

    objects = DatabaseManager()

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
        return f"Таблица {self.title} (база данных: {self.database.name})"


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


class UserDatabaseSession(models.Model):
    class Meta:
        verbose_name = "Сессия БД пользователя"
        verbose_name_plural = "Сессии БД пользователей"

    user = models.ForeignKey("user.User", on_delete=models.CASCADE, verbose_name="Пользователь")
    database = models.ForeignKey("databases.Database", on_delete=models.CASCADE, verbose_name="База данных")
    expired_at = models.DateTimeField(verbose_name="Дата и время окончания сессии")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата и время создания сессии")
    operations_count = models.IntegerField(verbose_name="Количество операций", default=0)

    def __str__(self) -> str:
        return f"Сессия {self.id} БД пользователя {self.user_id} (база данных: {self.database_id})"
