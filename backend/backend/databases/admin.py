from django.contrib import admin
from django import forms
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from backend.databases.models import TableRelationParticipant, Database, Table, Prop, Relation
from backend.databases.utils import create_db_from_dump, get_database_schema_from_psql


@admin.register(Database)
class DatabaseAdmin(admin.ModelAdmin):
    # actions = (upload_file,)
    change_list_template = "admin/custom_change_list.html"

    def get_urls(self):
        return [
            path("upload_dump/", self.admin_site.admin_view(self.upload_dump), name="generate-codes"),
        ] + super().get_urls()

    @csrf_exempt
    def upload_dump(self, request):
        class UploadDumpFile(forms.Form):
            dump_file = forms.FileField()

        if request.method == "POST":
            form = UploadDumpFile(request.POST, request.FILES)
            if form.is_valid():
                db_name = create_db_from_dump(form.cleaned_data["dump_file"])
                # db_name, _ = form.cleaned_data["dump_file"].name.split('.')
                db_schema = get_database_schema_from_psql(db_name)
                Database.objects.create_database_from_schema(db_schema)

                return HttpResponseRedirect("/admin/databases/database/")

        context = dict(
            self.admin_site.each_context(request),
            opts=Database._meta,
            title="Upload File",
            form=UploadDumpFile(),
        )

        return TemplateResponse(request, "admin/upload_dump.html", context)


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_select_related = ("database",)


@admin.register(Prop)
class PropAdmin(admin.ModelAdmin):
    pass


@admin.register(Relation)
class RelationAdmin(admin.ModelAdmin):
    pass


@admin.register(TableRelationParticipant)
class TableRelationParticipantAdmin(admin.ModelAdmin):
    pass
