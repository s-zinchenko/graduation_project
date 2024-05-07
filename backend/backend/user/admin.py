import uuid
from typing import Any

from django.contrib import admin
from django.http import HttpResponse, HttpResponseRedirect

from backend.user.models import InviteLink, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass


@admin.register(InviteLink)
class InviteLinkAdmin(admin.ModelAdmin):
    readonly_fields = ("code", "author")
    change_form_template = "generate_invite_link.html"

    def response_change(self, request: Any, obj: InviteLink) -> HttpResponse:
        """A method to generate token by clicking on custom button"""
        if "_generate_code" in request.POST:
            obj.code = uuid.uuid4().hex
            obj.save()
            return HttpResponseRedirect(".")
        return super().response_change(request, obj)

    def save_model(self, request, obj, form, change):
        if not obj.author_id:
            obj.author = request.user

        if not obj.code:
            obj.code = uuid.uuid4().hex

        return super().save_model(request, obj, form, change)