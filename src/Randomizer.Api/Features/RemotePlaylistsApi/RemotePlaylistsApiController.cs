using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;
using Randomizer.Dal;

namespace Randomizer.Api.Features.RemotePlaylistsApi;


[ApiController]
[Authorize]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/remote-playlists")]
public class RemotePlaylistsApiController : ControllerBase
{
	private readonly IServiceProvider serviceProvider;

	public RemotePlaylistsApiController(IServiceProvider serviceProvider)
	{
		this.serviceProvider = serviceProvider;
	}

	[HttpGet]
	[ProducesResponseType(typeof(ProblemDetails), 401)]
	[ProducesResponseType(typeof(ProblemDetails), 404)]
	public async Task<ActionResult<GetRemotePlaylistApiModel>> GetRemotePlaylistContents(string playlistId, MusicProvider musicProvider)
	{
		var res = await serviceProvider.GetRequiredKeyedService<IRemotePlaylistsService>(musicProvider)
						.GetPlaylistContents(playlistId, HttpContext.RequestAborted);

		return Ok(new GetRemotePlaylistApiModel
		{
			PlaylistId = playlistId,
			MusicProvider = musicProvider,
			PlaylistName = res.PlaylistName,
			Tracks = res.Tracks.ConvertAll<PlaylistTrackApiModel>(x => new()
			{
				RemoteTrackId = x.RemoteTrackId,
				TrackName = x.TrackName
			})
		});
	}
};