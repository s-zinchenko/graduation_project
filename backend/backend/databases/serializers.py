from typing import Any

from django_serializer.v2.serializer import Serializer
from marshmallow import fields, pre_dump

from backend.databases.models import Database, Table, TableRelationParticipant, Relation

"""

GET https://sql-academy.org/api/v1/db/open 

[
  {
  "title": "Авиаперелёты",
  "description": "Схема авиаперелётов, связующая пассажиров с проданными билетами",
  "active": true,
  "name": "Airo",
  "tables": [
    {
      "id": "company",
      "props": [
        {
          "isKey": true,
          "id": "id",
          "name": "id",
          "type": "INT",
          "description": null
        },
        {
          "description": "Название компании-перевозчика",
          "isKey": false,
          "id": "name",
          "name": "name",
          "type": "VARCHAR"
        }
      ],
      "title": "Company",
      "description": "Компании, осуществляющие авиаперелёты"
    },
    {
      "id": "passenger",
      "props": [
        {
          "isKey": true,
          "id": "id",
          "name": "id",
          "type": "INT",
          "description": null
        },
        {
          "description": "Имя и фамилия пассажира",
          "isKey": false,
          "id": "name",
          "name": "name",
          "type": "VARCHAR"
        }
      ],
      "title": "Passenger",
      "description": "Пассажиры, купившие билет"
    },
    {
      "id": "pass_in_trip",
      "props": [
        {
          "isKey": true,
          "id": "id",
          "name": "id",
          "type": "INT",
          "description": null
        },
        {
          "description": "Идентификатор билета",
          "isKey": false,
          "id": "trip",
          "name": "trip",
          "type": "INT"
        },
        {
          "description": "Идентификатор пассажира",
          "isKey": false,
          "id": "passenger",
          "name": "passenger",
          "type": "INT"
        },
        {
          "description": "Место пассажира в самолёте",
          "isKey": false,
          "id": "place",
          "name": "place",
          "type": "VARCHAR"
        }
      ],
      "title": "Pass_in_trip",
      "description": "Список купленных билетов"
    },
    {
      "id": "trip",
      "props": [
        {
          "isKey": true,
          "id": "id",
          "name": "id",
          "type": "INT",
          "description": null
        },
        {
          "description": "Идентификатор компании-перевозчика",
          "isKey": false,
          "id": "company",
          "name": "company",
          "type": "INT"
        },
        {
          "description": "Модель самолёта",
          "isKey": false,
          "id": "plane",
          "name": "plane",
          "type": "VARCHAR"
        },
        {
          "description": "Город вылета",
          "isKey": false,
          "id": "town_from",
          "name": "town_from",
          "type": "VARCHAR"
        },
        {
          "description": "Город прилёта",
          "isKey": false,
          "id": "town_to",
          "name": "town_to",
          "type": "VARCHAR"
        },
        {
          "description": "Время вылета",
          "isKey": false,
          "id": "time_out",
          "name": "time_out",
          "type": "DATETIME"
        },
        {
          "description": "Время прилёта",
          "isKey": false,
          "id": "time_in",
          "name": "time_in",
          "type": "DATETIME"
        }
      ],
      "title": "Trip",
      "description": "Расписание рейсов"
    }
  ],
  "relations": [
    {
      "source": {
        "table": "company",
        "field": "id"
      },
      "target": {
        "table": "trip",
        "field": "company"
      },
      "type": "one-to-many",
      "id": "186646a0-837d-11ed-86a4-eb63bd778277"
    },
    {
      "source": {
        "table": "trip",
        "field": "id"
      },
      "target": {
        "table": "pass_in_trip",
        "field": "trip"
      },
      "type": "one-to-many",
      "id": "186646a1-837d-11ed-86a4-eb63bd778277"
    },
    {
      "source": {
        "table": "passenger",
        "field": "id"
      },
      "target": {
        "table": "pass_in_trip",
        "field": "passenger"
      },
      "type": "one-to-many",
      "id": "186646a2-837d-11ed-86a4-eb63bd778277"
    }
  ],
  "tablePosition": {
    "trip": {
      "x": 0,
      "y": 181
    },
    "pass_in_trip": {
      "x": 380,
      "y": 150
    },
    "passenger": {
      "x": 387,
      "y": 391
    },
    "company": {
      "x": 3,
      "y": 490
    }
  },
  "id": "4ed2b809d7446b9a0e100001"
}
]

"""
class PropItemSerializer(Serializer):
    id = fields.Integer()
    is_key = fields.Bool()
    name = fields.Str()
    type = fields.Str()
    description = fields.Str()


class TableItemSerializer(Serializer):
    id = fields.Integer()
    title = fields.Str()
    description = fields.Str()
    props = fields.Nested(PropItemSerializer(), many=True)

    @pre_dump
    def prepare(self, obj: Table, *args: Any, **kwargs: Any) -> Table:
        obj.props = obj.prop_set.all()
        return obj


class TableRelationParticipantItemSerializer(Serializer):
    id = fields.Integer()
    table_name = fields.Str()
    field_name = fields.Str()

    @pre_dump
    def prepare(self, obj: TableRelationParticipant, *args: Any, **kwargs: Any) -> TableRelationParticipant:
        obj.table_name = obj.table.name
        obj.field_name = obj.field.name
        return obj


class RelationItemSerializer(Serializer):
    id = fields.Integer()
    type = fields.Str()
    source = fields.Nested(TableRelationParticipantItemSerializer())
    target = fields.Nested(TableRelationParticipantItemSerializer())

    @pre_dump
    def prepare(self, obj: Relation, *args: Any, **kwargs: Any) -> Relation:
        # obj.source = obj.source
        # obj.target = obj.target
        return obj


class DatabasesListItemSerializer(Serializer):
    id = fields.Integer()
    title = fields.Str()
    description = fields.Str()
    active = fields.Str()
    name = fields.Str()
    tables = fields.Nested(TableItemSerializer(), many=True)
    relations = fields.Nested(RelationItemSerializer(), many=True)

    @pre_dump
    def prepare(self, obj: Database, *args: Any, **kwargs: Any) -> Database:
        obj.tables = obj.table_set.all()
        obj.relations = obj.relation_set.all()
        return obj


class DatabasesListSerializer(Serializer):
    items = fields.Nested(DatabasesListItemSerializer(), many=True)
