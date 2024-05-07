from django_serializer.v2.serializer import ModelSerializer, Serializer
from marshmallow import fields, pre_dump

from backend.user.models import User


class UserSerializer(ModelSerializer):
    class SMeta:
        model = User
        fields = ("id", "username")


class UserStatSerializer(Serializer):
    date = fields.Str()
    completed_tasks_count = fields.Int()

    @pre_dump
    def pre_dump(self, obj, **kwargs):
        obj["date"] = obj["updated_at"].isoformat()
        return obj
