using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Api.Features.Auth;
using Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;

namespace Randomizer.Api.Features.PlayerProgressApi;

[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/players/{playerId:guid}/player-progress")]
public class PlayerProgressApiController : ControllerBase
{
	private readonly IPlayerProgressService playerProgressService;

	public PlayerProgressApiController(IPlayerProgressService playerProgressService)
	{
		this.playerProgressService = playerProgressService;
	}

	[HttpGet]
	public async Task<ActionResult<GetPlayerProgressApiModel>> GetPlayerProgressAsync(Guid playerId)
	{
		var res = await playerProgressService.GetCurrentTrack(User.GetUserId(), playerId);

		if (res == null) return NotFound();

		return Ok(new GetPlayerProgressApiModel{
			PlayerId = res.PlayerId,
			PlayerTrackId = res.CurrentTrackId
		});
	}
	
	[HttpPut]
	public async Task<ActionResult<GetPlayerProgressApiModel>> PutPlayerProgressAsync(Guid playerId, PutPlayerProgressApiModel payload)
	{
		var res = await playerProgressService.SetCurrentTrack(User.GetUserId(), playerId, payload.PlayerTrackId);
		return Ok(new GetPlayerProgressApiModel{
			PlayerId = res.PlayerId,
			PlayerTrackId = res.CurrentTrackId
		});
	}
}