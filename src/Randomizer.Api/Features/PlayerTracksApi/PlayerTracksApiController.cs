using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Features.Auth;
using Randomizer.Api.Features.PlayerTracksApi.PlayerTracksService;

namespace Randomizer.Api.Features.PlayerTracksApi;


[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/players/{playerId:guid}/tracks")]
public class PlayerTracksApiController : ControllerBase
{
	private readonly IPlayerTracksService service;

	public PlayerTracksApiController(IPlayerTracksService service)
	{
		this.service = service;
	}

	[HttpGet]
	public async Task<ActionResult<List<GetPlayerTracksApiModel>>> GetPlayerTracksAsync(Guid playerId)
	{
		var res = await service.GetPlayerTracks(User.GetUserId(), playerId);
		return res.ConvertAll(x => new GetPlayerTracksApiModel
		{
			RemoteTrackId = x.RemoteTrackId,
			TrackId = x.TrackId,
			TrackName = x.TrackName,
			TrackType = x.TrackType,
			TrackWeight = x.TrackWeight
		});
	}
}