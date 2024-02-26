from django.contrib import admin

from backend.databases.models import TableRelationParticipant, Database, Table, Prop, Relation


@admin.register(Database)
class DatabaseAdmin(admin.ModelAdmin):
    pass


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    pass


@admin.register(Prop)
class PropAdmin(admin.ModelAdmin):
    pass


@admin.register(Relation)
class RelationAdmin(admin.ModelAdmin):
    pass


@admin.register(TableRelationParticipant)
class TableRelationParticipantAdmin(admin.ModelAdmin):
    pass
