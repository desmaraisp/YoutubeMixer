from django.urls import path
from .views import Get_Combined_Playlist_Contents_From_Request

urlpatterns = [
    path("Get_Combined_Playlist_Contents_From_Request", Get_Combined_Playlist_Contents_From_Request, name="Get_Combined_Playlist_Contents_From_Request"),
]