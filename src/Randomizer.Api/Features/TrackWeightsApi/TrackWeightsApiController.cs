using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Api.Features.Auth;

namespace Randomizer.Api.Features.TrackWeightsApi;

[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/players/{playerId:guid}/track-weights")]
public class RemotePlaylistsApiController : ControllerBase
{
	private readonly TrackWeightsService.ITrackWeightsService service;

	public RemotePlaylistsApiController(TrackWeightsService.ITrackWeightsService service)
	{
		this.service = service;
	}

	[HttpPut]
	public async Task<IActionResult> UpdateTrackWeights(Guid playerId, List<PutTrackWeightsApiModel> payload)
	{
		await service.UpdatePlayerWeightsCollection(User.GetUserId(), playerId, payload.ConvertAll(x => x.ToDto()));
		return Ok();
	}
};