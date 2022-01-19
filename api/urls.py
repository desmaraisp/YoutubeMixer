from django.urls import path
from .views import Get_Playlist_Contents

urlpatterns = [
    path("Get_Playlist_Contents", Get_Playlist_Contents, name="Get_Playlist_Contents"),
]