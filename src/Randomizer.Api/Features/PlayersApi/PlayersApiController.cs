using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Api.Features.Auth;
using Randomizer.Api.Features.PlayersApi.PlayersService;

namespace Randomizer.Api.Features.PlayersApi;


[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/users/{userId:string}/players")]
[UserIdAuthorizationFilter]
public class PlayersApiController : ControllerBase
{
	private readonly IPlayersService playersService;

	public PlayersApiController(IPlayersService playersService)
	{
		this.playersService = playersService;
	}

	private static GetPlayerApiModel CreateApiModel(GetPlayerDto getPlayerDto) => new()
	{
		PlayerId = getPlayerDto.PlayerId,
		PlayerName = getPlayerDto.PlayerName,
		PlaylistsCount = getPlayerDto.PlaylistsCount,
		TracksCount = getPlayerDto.TracksCount,
	};

	[HttpGet("{playerId:guid}")]
	public async Task<ActionResult<GetPlayerApiModel>> GetPlayerAsync(string UserId, Guid playerId)
	{
		var result = await playersService.GetPlayer(UserId, playerId);
		return CreateApiModel(result);
	}

	[HttpGet]
	public async Task<ActionResult<List<GetPlayerApiModel>>> GetPlayersAsync(string UserId)
	{
		var res = await playersService.GetUserPlayers(UserId);
		return res.ConvertAll(CreateApiModel);
	}

	[HttpPost]
	public async Task<ActionResult<GetPlayerApiModel>> PostPlayerAsync(string UserId, PostOrPutPlayerApiModel payload)
	{
		var res = await playersService.CreateNewPlayer(UserId, payload.PlayerName);

		return CreateApiModel(res);
	}

	[HttpPut("{playerId:guid}")]
	public async Task<ActionResult<GetPlayerApiModel>> PutPlayerAsync(string UserId, Guid playerId, PostOrPutPlayerApiModel payload)
	{
		var res = await playersService.UpsertPlayer(UserId, playerId, payload.PlayerName);

		return CreateApiModel(res);
	}

	[HttpDelete("{playerId:guid}")]
	public async Task<IActionResult> DeletePlayerAsync(string UserId, Guid playerId)
	{
		await playersService.DeletePlayer(UserId, playerId);
		return NoContent();
	}
}