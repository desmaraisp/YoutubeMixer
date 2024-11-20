using Microsoft.EntityFrameworkCore;
using Randomizer.Dal;

namespace Randomizer.Api.Features.PlayerTracksApi.PlayerTracksService;

public class PlayerTracksService : IPlayerTracksService
{
	private readonly RandomizerContext context;

	public PlayerTracksService(RandomizerContext context)
	{
		this.context = context;
	}

	public async Task<List<GetPlayerTracksDto>> GetPlayerTracks(string UserId, Guid PlayerId)
	{
		return await context.Players.Where(x => x.UserId == UserId && x.PlayerId == PlayerId)
			.SelectMany(x =>
				x.Playlists.Where(y => !y.IsDisabled)
					.SelectMany(playlist =>
						playlist.PlaylistTracks.Select(track =>
							new GetPlayerTracksDto
							{
								TrackType = track.Playlist.RemotePlaylistType,
								RemoteTrackId = track.RemoteTrackId,
								TrackId = track.TrackId,
								TrackName = track.TrackName,
								TrackWeight = track.TrackWeight == null ? 0 : track.TrackWeight.WeightValue
							}
						)
					)
			).OrderBy(x => x.TrackWeight).ToListAsync();
	}
}