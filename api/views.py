import django.http as djh

def Get_Playlist_Contents(HttpRequest):
	return djh.JsonResponse(
		{"test":"testvalue"}
	)
