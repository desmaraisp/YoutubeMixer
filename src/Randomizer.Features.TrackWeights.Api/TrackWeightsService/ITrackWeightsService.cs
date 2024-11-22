namespace Randomizer.Features.TrackWeights.Api.TrackWeightsService;

public interface ITrackWeightsService
{
	public Task UpdatePlayerWeightsCollection(string userId, Guid playerId, List<UpdateTrackWeightsCollectionDto> payload);
}