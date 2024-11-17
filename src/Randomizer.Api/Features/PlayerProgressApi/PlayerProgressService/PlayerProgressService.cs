using Microsoft.EntityFrameworkCore;
using Randomizer.Dal;

namespace Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;

public class PlayerProgressService : IPlayerProgressService
{
	private readonly RandomizerContext context;

	public PlayerProgressService(RandomizerContext context)
	{
		this.context = context;
	}

	public async Task<GetCurrentTrackDto?> GetCurrentTrack(string UserId, Guid PlayerId)
	{
		var res = await context.PlayerProgresses.Where(x => x.PlayerId == PlayerId && x.Player.UserId == UserId)
			.Select(x => new GetCurrentTrackDto
			{
				PlayerId = x.PlayerId,
				CurrentTrackId = x.CurrentTrackId
			}).SingleOrDefaultAsync();

		return res;
	}

	public async Task<GetCurrentTrackDto> SetCurrentTrack(string UserId, Guid PlayerId, Guid CurrentTrackId)
	{
		var playerExists = await context.Players.AnyAsync(x => x.PlayerId == PlayerId && x.UserId == UserId);
		if (!playerExists)
		{
			throw new PlayerNotFoundException("Could not find any player for this Id") { Data = { { "PlayerId", PlayerId }, { "UserId", UserId } } };
		}

		bool trackExists = await context.Playlists.AnyAsync(x => x.PlayerId == PlayerId && x.PlaylistTracks.Any(y => y.TrackId == CurrentTrackId));
		if (!trackExists)
		{
			throw new PlayerTrackNotFoundException("This trackId doesn't exist for this player");
		}

		var progress = await context.PlayerProgresses.Where(x => x.PlayerId == PlayerId).SingleOrDefaultAsync();
		if (progress == null)
		{
			progress = context.PlayerProgresses.Add(new()
			{
				CurrentTrackId = CurrentTrackId,
				PlayerId = PlayerId
			}).Entity;
		}
		else
		{
			progress.CurrentTrackId = CurrentTrackId;
		}
		await context.SaveChangesAsync();

		return new()
		{
			PlayerId = progress.PlayerId,
			CurrentTrackId = progress.CurrentTrackId,
		};
	}
}