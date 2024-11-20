using Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;
using Randomizer.Dal;
using static Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService.AddOrUpsertPlaylistDto;

namespace Randomizer.Api.Features.PlayerPlaylistsApi;

public record class PostOrPutPlaylistsApiModel
{
	public required string RemotePlaylistId { get; init; }
	public required MusicProvider RemotePlaylistType { get; init; }
	public required string PlaylistName { get; init; }
	public bool IsDisabled { get; init; }
	public required Guid PlayerId { get; init; }
	public required List<TrackApiModel> Tracks { get; init; }

	public class TrackApiModel
	{
		public required string RemoteTrackId { get; init; }
		public required string TrackName { get; init; }
	}

	public AddOrUpsertPlaylistDto ToDto() => new()
	{
		PlayerId = PlayerId,
		PlaylistName = PlaylistName,
		RemotePlaylistId = RemotePlaylistId,
		RemotePlaylistType = RemotePlaylistType,
		Tracks = Tracks.ConvertAll<TrackDto>(x => new()
		{
			RemoteTrackId = x.RemoteTrackId,
			TrackName = x.TrackName
		}),
		IsDisabled = IsDisabled,
	};
}