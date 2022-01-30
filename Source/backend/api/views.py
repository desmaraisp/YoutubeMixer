from rest_framework.decorators import api_view
from rest_framework.response import Response
import googleapiclient.discovery
import dpath.util as dpu
import os

def start_Google_API():
	api_service_name = "youtube"
	api_version = "v3"
	DEVELOPER_KEY = os.environ["Youtube_API_Key"]
	youtube = googleapiclient.discovery.build(
		api_service_name, api_version, developerKey = DEVELOPER_KEY
		)
	return youtube
	

def Get_Single_PlayList_Contents(YoutubeObject,PlaylistID):
	try:
		result = YoutubeObject.playlistItems().list(
				part="snippet",
				playlistId=PlaylistID,
				maxResults="50"
			).execute()
	except googleapiclient.discovery.HttpError as e:
		return []

	while ('nextPageToken' in result):
		nextPage = YoutubeObject.playlistItems().list(
			part="snippet",
			playlistId=PlaylistID,
			maxResults="50",
			pageToken=result.get('nextPageToken')
		).execute()
		
		result['items'] = result['items'] + nextPage['items']

		if 'nextPageToken' not in nextPage:
			result.pop('nextPageToken', None)
		else:
			nextPageToken = nextPage['nextPageToken']
	
	Result = []
	video_IDs = dpu.values(result, "**/snippet/resourceId/videoId")

	for i, ID in enumerate(video_IDs):
		Result.append(
			{
				"VideoID":ID,
				"Image":"Placeholder",
				"Title":i,
			}
		)
	return Result



def Get_Combined_Video_IDs_From_Playlists(Playlist_All_IDs):
	Combined_Playlists_Video_IDs = []
	
	YoutubeObject = start_Google_API()
	for PlayListID in Playlist_All_IDs:
		Video_IDs_For_this_Playlist = Get_Single_PlayList_Contents(YoutubeObject, PlayListID)
		Combined_Playlists_Video_IDs.extend(Video_IDs_For_this_Playlist)
	
	return Combined_Playlists_Video_IDs


@api_view(['GET'])
def Get_Combined_Playlist_Contents_From_Request(request):
	playlistIDs = request.GET.getlist('PlaylistID')

	Resulting_Video_Ids = Get_Combined_Video_IDs_From_Playlists(playlistIDs)

	return Response(
		{"Contents":Resulting_Video_Ids}
	)
