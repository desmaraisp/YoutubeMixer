using Randomizer.Dal;

namespace Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;

public class AddOrUpsertPlaylistDto
{
	public required string RemotePlaylistId { get; init; }
	public required MusicProvider RemotePlaylistType { get; init; }
	public required string PlaylistName { get; init; }
	public bool IsDisabled { get; init; }
	public required Guid PlayerId { get; init; }
	public required List<TrackDto> Tracks { get; init; }

	public class TrackDto
	{
		public required string RemoteTrackId { get; init; }
		public required string TrackName { get; init; }
	}
}