using Randomizer.Dal;

namespace Randomizer.Api.Features.RemotePlaylistsApi;

public record class GetRemotePlaylistApiModel
{
	public required string PlaylistName { get; init; }
	public required MusicProvider MusicProvider { get; init; }
	public required List<PlaylistTrackApiModel> Tracks { get; init; }
	public required string PlaylistId { get; init; }
}
public record class PlaylistTrackApiModel
{
	public required string RemoteTrackId { get; init; }
	public required string TrackName { get; init; }
}
