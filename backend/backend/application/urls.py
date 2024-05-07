"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django_serializer.v2.swagger.views import index as swagger_index

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        "api/",
        include(
            [
                path(
                    "user.",
                    include("backend.user.urls"),
                ),
                path(
                    "databases.",
                    include("backend.databases.urls"),
                ),
                path(
                    "course.",
                    include("backend.course.urls"),
                ),
                path("swagger.json", swagger_index),
            ]
        ),
    ),
]