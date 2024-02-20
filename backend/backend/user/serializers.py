from django_serializer.v2.serializer import ModelSerializer

from backend.user.models import User


class UserSerializer(ModelSerializer):
    class SMeta:
        model = User
        fields = ("id", "username")
