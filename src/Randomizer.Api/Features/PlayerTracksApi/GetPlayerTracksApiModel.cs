using Randomizer.Dal;

namespace Randomizer.Api.Features.PlayerTracksApi;

public record class GetPlayerTracksApiModel
{
	public required Guid TrackId { get; init; }
	public required string TrackName { get; init; }
	public required string RemoteTrackId { get; init; }
	public required float TrackWeight { get; init; }
	public required MusicProvider TrackType { get; init; }
}
