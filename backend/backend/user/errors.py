from django_serializer.v2.exceptions import HttpError


class UnauthorizedError(HttpError):
    def __init__(self, description="Incorrect login or password"):
        super().__init__(http_code=400, alias="incorrect_credentials", description=description)


class NotUniqueUsernameError(HttpError):
    def __init__(self, description="Username must be unique"):
        super().__init__(http_code=400, alias="not_unique_username", description=description)
