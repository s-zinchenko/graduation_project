from django import forms

from backend.databases.models import Database


class DatabaseForm(forms.Form):
    database = forms.ModelChoiceField(queryset=Database.objects.all().values_list("id", flat=True))


class ExecuteQueryForm(DatabaseForm):
    query = forms.CharField()


class CreateDatabasesSessionForm(DatabaseForm):
    pass
