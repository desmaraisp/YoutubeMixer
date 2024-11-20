using System.Globalization;
using System.Net;
using Microsoft.AspNetCore.WebUtilities;

namespace Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;

public class SpotifyPlaylistsService : IRemotePlaylistsService
{
	private readonly HttpClient httpClient;
	public SpotifyPlaylistsService(HttpClient httpClient)
	{
		this.httpClient = httpClient;
	}

	public async Task<GetRemotePlaylistDto> GetPlaylistContents(string playlistId, CancellationToken cancellationToken)
	{
		var res = await GetPlaylistDetails(playlistId, 0, cancellationToken);

		int totalNumberOfRequests = (int)Math.Round((double)(res.Tracks.Total / 50));
		var additionalPages = await Task.WhenAll(
			Enumerable.Range(1, totalNumberOfRequests).Select(i => GetPlaylistDetails(playlistId, i * 50, cancellationToken))
		);
		res.Tracks.Items.AddRange(additionalPages.SelectMany(x => x?.Tracks.Items ?? []));

		return new()
		{
			PlaylistName = res.Name,
			Tracks = res.Tracks.Items.ConvertAll<PlaylistTrack>(x => new()
			{
				RemoteTrackId = x.Track.Uri,
				TrackName = x.Track.Name,
			})
		};
	}
	private async Task<SpotifyPlaylist> GetPlaylistDetails(string playlistId, int offset, CancellationToken cancellationToken)
	{
		Uri uri = new(QueryHelpers.AddQueryString($"/v1/playlists/{Uri.EscapeDataString(playlistId)}", new Dictionary<string, string?>{
			{ "fields", "name,id,total,tracks(total),tracks.items.track(name,uri)" },
			{ "limit", "50" },
			{ "offset", offset.ToString(CultureInfo.InvariantCulture) }
		}), UriKind.Relative);

		try
		{
			using var resp = await httpClient.GetAsync(uri, cancellationToken);
			if (resp.StatusCode == HttpStatusCode.OK)
			{
				return await resp.Content.ReadFromJsonAsync<SpotifyPlaylist>(cancellationToken) ??
						throw new RemotePlaylistNotFoundException("Spotify api returned a null value which isn't expected");
			}
			if (resp.StatusCode == HttpStatusCode.NotFound)
			{
				throw new RemotePlaylistNotFoundException("Remote spotify playlist not found")
				{
					Data = { { "PlaylistId", playlistId } }
				};
			}
			throw new RemotePlaylistApiException("Spotify playlists api returned an invalid status code")
			{
				Response = await resp.Content.ReadAsStringAsync(cancellationToken),
				StatusCode = resp.StatusCode
			};
		}
		catch (Exception e) when (e is HttpRequestException)
		{
			throw new RemotePlaylistApiException("Failed to fetch spotify playlist", e);
		}
	}

	private sealed class SpotifyPlaylist
	{
		public required string Id { get; init; }
		public required string Name { get; init; }
		public required TracksInformation Tracks { get; init; }
	}
	private sealed class TracksInformation
	{
		public int Total { get; init; }
		public List<TrackItem> Items { get; init; } = [];
	}
	private sealed class TrackItem
	{
		public required Track Track { get; init; }
	}
	private sealed class Track
	{
		public required string Name { get; init; }
		public required string Uri { get; init; }
	}
}

