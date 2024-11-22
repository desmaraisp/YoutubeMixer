using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Features.Auth;
using Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;

namespace Randomizer.Api.Features.PlayerPlaylistsApi;

[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/playlists")]
public class PlayerPlaylistsApiController : ControllerBase
{
	private readonly IPlayerPlaylistsService service;

	public PlayerPlaylistsApiController(IPlayerPlaylistsService playerPlaylistsService)
	{
		service = playerPlaylistsService;
	}

	[HttpGet]
	public async Task<ActionResult<List<GetPlaylistsApiModel>>> GetPlayerPlaylistsAsync(Guid playerId)
	{
		var userId = User.GetUserId();
		var res = await service.GetPlayerPlaylists(userId, playerId);

		return Ok(res);
	}


	[HttpPost]
	public async Task<IActionResult> PostPlayerPlaylistAsync(PostOrPutPlaylistsApiModel payload)
	{
		var userId = User.GetUserId();
		var res = await service.AddPlaylist(userId, payload.ToDto());

		return Ok(GetPlaylistsApiModel.FromDto(res));
	}

	[HttpPut("{playlistId:guid}")]
	public async Task<IActionResult> PutPlayerPlaylistAsync(Guid playlistId, PostOrPutPlaylistsApiModel payload)
	{
		var userId = User.GetUserId();
		var res = await service.UpsertPlaylist(userId, playlistId, payload.ToDto());

		return Ok(GetPlaylistsApiModel.FromDto(res));
	}

	[HttpDelete("{playerPlaylistId:guid}")]
	public async Task<IActionResult> DeletePlayerPlaylistAsync(Guid playerPlaylistId)
	{
		var userId = User.GetUserId();

		await service.DeletePlaylist(userId, playerPlaylistId);
		return NoContent();
	}
}