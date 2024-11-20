namespace Randomizer.Api.Features.TrackWeightsApi.TrackWeightsService;

public class UpdateTrackWeightsCollectionDto
{
	public required Guid TrackId { get; init; }
	public required float WeightValue { get; init; }
}