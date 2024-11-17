namespace Randomizer.Api.Features.PlayerProgressApi;

public record class PutPlayerProgressApiModel
{
	public required Guid PlayerTrackId { get; init; }
}
