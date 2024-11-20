using Randomizer.Dal;

namespace Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;

public record class GetPlaylistDto
{
	public required Guid PlaylistId { get; init; }
	public required string RemotePlaylistId { get; init; }
	public required MusicProvider RemotePlaylistType { get; init; }
	public required string PlaylistName { get; init; }
	public bool IsDisabled { get; init; }
	public required Guid PlayerId { get; init; }
	public required List<Track> Tracks { get; init; }

	public class Track
	{
		public Guid TrackId { get; init; }
		public required string RemoteTrackId { get; init; }
		public required string TrackName { get; init; }
	}
}