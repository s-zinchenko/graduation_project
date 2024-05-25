from django_serializer.v2.serializer import ModelSerializer, Serializer
from marshmallow import fields, pre_dump

from backend.user.models import User
from backend.user.utils import is_lazy_user


class UserSerializer(ModelSerializer):
    class SMeta:
        model = User
        fields = ("id", "username", "date_joined")

    is_lazy = fields.Bool()


class UserStatSerializer(Serializer):
    date = fields.Str()
    count = fields.Int()

    @pre_dump
    def pre_dump(self, obj, **kwargs):
        obj["date"] = obj["updated_at"].isoformat()
        return obj
