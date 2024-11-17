namespace Randomizer.Api.Features.PlayerProgressApi;

public record class GetPlayerProgressApiModel
{
	public required Guid PlayerId { get; init; }
	public required Guid PlayerTrackId { get; init; }

}