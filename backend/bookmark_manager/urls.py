from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect


def redirect_frontend(request):
    return redirect("https://rosetta-bookmark.vercel.app")


urlpatterns = [
    path("", redirect_frontend),
    path("admin/", admin.site.urls),
    path("api/", include("bookmarks.urls")),
]
