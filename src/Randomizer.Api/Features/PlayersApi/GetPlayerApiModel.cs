namespace Randomizer.Api.Features.PlayersApi;

public class GetPlayerApiModel
{
	public required Guid PlayerId { get; init; }
	public required string PlayerName { get; init; }
	public required int TracksCount { get; init; }
	public required int PlaylistsCount { get; init; }
}