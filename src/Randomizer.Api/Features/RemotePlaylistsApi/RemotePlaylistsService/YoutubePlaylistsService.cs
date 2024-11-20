using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;

namespace Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;

public class YoutubePlaylistsService : IRemotePlaylistsService
{
	private readonly YouTubeService youTubeService;

	public YoutubePlaylistsService(YouTubeService youTubeService)
	{
		this.youTubeService = youTubeService;
	}

	public async Task<GetRemotePlaylistDto> GetPlaylistContents(string playlistId, CancellationToken cancellationToken)
	{
		var dataTask = GetPlaylistData(playlistId, cancellationToken);
		var itemsTask = GetPlaylistItems(playlistId, cancellationToken);

		return new GetRemotePlaylistDto
		{
			PlaylistName = (await dataTask).Snippet.Title,
			Tracks = (await itemsTask).ConvertAll<PlaylistTrack>(x => new()
			{
				RemoteTrackId = x.Snippet.ResourceId.VideoId,
				TrackName = x.Snippet.Title
			})
		};
	}

	private async Task<Playlist> GetPlaylistData(string playlistId, CancellationToken cancellationToken)
	{
		var listRequest = youTubeService.Playlists.List("snippet");
		listRequest.Id = playlistId;

		var res = await listRequest.ExecuteAsync(cancellationToken);
		return res.Items.SingleOrDefault() ?? throw new RemotePlaylistNotFoundException("No youtube playlist found for this Id")
		{
			Data = { { "PlaylistId", playlistId } }
		};
	}
	private async Task<List<PlaylistItem>> GetPlaylistItems(string playlistId, CancellationToken cancellationToken)
	{
		List<PlaylistItem> res = [];
		var listRequest = youTubeService.PlaylistItems.List("snippet");
		listRequest.Id = playlistId;
		listRequest.MaxResults = 50;

		var response = await listRequest.ExecuteAsync(cancellationToken);

		string nextPageToken = response.NextPageToken;
		res.AddRange(response.Items);
		while (!string.IsNullOrWhiteSpace(nextPageToken))
		{
			listRequest.PageToken = nextPageToken;
			response = await listRequest.ExecuteAsync(cancellationToken);
			res.AddRange(response.Items);
			nextPageToken = response.NextPageToken;
		}
		return res;
	}
}