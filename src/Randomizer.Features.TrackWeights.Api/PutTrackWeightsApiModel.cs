using Randomizer.Features.TrackWeights.Api.TrackWeightsService;

namespace Randomizer.Features.TrackWeights.Api;

public class PutTrackWeightsApiModel
{
	public required Guid TrackId { get; init; }
	public required float WeightValue { get; init; }

	public UpdateTrackWeightsCollectionDto ToDto() => new()
	{
		TrackId = TrackId,
		WeightValue = WeightValue
	};
}