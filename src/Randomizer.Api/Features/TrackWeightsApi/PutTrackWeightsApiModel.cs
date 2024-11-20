using Randomizer.Api.Features.TrackWeightsApi.TrackWeightsService;

namespace Randomizer.Api.Features.TrackWeightsApi;

public class PutTrackWeightsApiModel
{
	public required Guid TrackId { get; init; }
	public required float WeightValue { get; init; }

	public UpdateTrackWeightsCollectionDto ToDto() => new() {
		TrackId = TrackId,
		WeightValue = WeightValue
	};
}