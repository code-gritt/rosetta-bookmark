from django.urls import path
from .views import signup_view, login_view, logout_view, bookmark_list, bookmark_create, bookmark_update, bookmark_delete, bookmark_bulk_create

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('bookmarks/', bookmark_list, name='bookmark_list'),
    path('bookmarks/create/', bookmark_create, name='bookmark_create'),
    path("bookmarks/<int:pk>/update/", bookmark_update, name="bookmark-update"),
    path("bookmarks/<int:pk>/delete/", bookmark_delete, name="bookmark-delete"),
    path("bookmarks/bulk-create/", bookmark_bulk_create,
         name="bookmark-bulk-create"),
]
