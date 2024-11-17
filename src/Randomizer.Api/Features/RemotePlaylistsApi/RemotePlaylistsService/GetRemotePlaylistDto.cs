namespace Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;

public class GetRemotePlaylistDto
{
	public required string PlaylistName { get; init; }
	public required List<PlaylistTrack> Tracks { get; init; }
}

public record class PlaylistTrack
{
	public required string RemoteTrackId { get; init; }
	public required string TrackName { get; init; }
}
