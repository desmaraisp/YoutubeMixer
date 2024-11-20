using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Randomizer.Dal;

namespace Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;

public class PlayerPlaylistsService : IPlayerPlaylistsService
{
	private readonly RandomizerContext context;

	public PlayerPlaylistsService(RandomizerContext context)
	{
		this.context = context;
	}
	private static readonly Expression<Func<PlayerPlaylist, GetPlaylistDto>> PlaylistsProjectionExpression = playlist => new()
	{
		PlayerId = playlist.PlayerId,
		PlaylistId = playlist.PlaylistId,
		PlaylistName = playlist.PlaylistName,
		RemotePlaylistId = playlist.RemotePlaylistId,
		RemotePlaylistType = playlist.RemotePlaylistType,
		Tracks = playlist.PlaylistTracks.Select(x => new GetPlaylistDto.Track
		{
			RemoteTrackId = x.RemoteTrackId,
			TrackName = x.TrackName,
			TrackId = x.TrackId
		}).ToList(),
		IsDisabled = playlist.IsDisabled
	};
	private static readonly Func<PlayerPlaylist, GetPlaylistDto> ConvertPlaylistToDto = PlaylistsProjectionExpression.Compile();

	public async Task<List<GetPlaylistDto>> GetPlayerPlaylists(string userId, Guid playerId)
	{
		var playlists = await context.Playlists
					.Where(x => x.PlayerId == playerId && x.Player.UserId == userId)
					.Select(PlaylistsProjectionExpression)
					.ToListAsync();

		return playlists;
	}
	public async Task<GetPlaylistDto> AddPlaylist(string userId, AddOrUpsertPlaylistDto payload)
	{
		if (!await context.Players.AnyAsync(x => x.UserId == userId && x.PlayerId == payload.PlayerId))
		{
			throw new PlayerNotFoundException("Player does not exist");
		}

		var entity = AddPlaylistDto(context, payload);
		await context.SaveChangesAsync();

		return ConvertPlaylistToDto(entity.Entity);
	}


	public async Task<GetPlaylistDto> UpsertPlaylist(string userId, Guid playlistId, AddOrUpsertPlaylistDto payload)
	{
		if (!await context.Players.AnyAsync(x => x.UserId == userId && x.PlayerId == payload.PlayerId))
		{
			throw new PlayerNotFoundException("Player does not exist");
		}
		var entity = await context.Playlists
				.Include(x => x.PlaylistTracks)
				.SingleOrDefaultAsync(x => x.PlaylistId == playlistId);

		if (entity == null)
		{
			entity = AddPlaylistDto(context, payload).Entity;
		}
		else
		{
			entity.IsDisabled = payload.IsDisabled;
			entity.PlayerId = payload.PlayerId;
			entity.RemotePlaylistId = payload.RemotePlaylistId;
			entity.RemotePlaylistType = payload.RemotePlaylistType;
			entity.PlaylistName = payload.PlaylistName;
			entity.PlaylistTracks = payload.Tracks.ConvertAll<PlaylistTrack>(y => new()
			{
				RemoteTrackId = y.RemoteTrackId,
				TrackName = y.TrackName,
			});
		}

		await context.SaveChangesAsync();

		return ConvertPlaylistToDto(entity);
	}

	public async Task DeletePlaylist(string userId, Guid playerPlaylistId)
	{
		await context.Playlists.Where(x => x.Player.UserId == userId && x.PlaylistId == playerPlaylistId).ExecuteDeleteAsync();
	}


	private static EntityEntry<PlayerPlaylist> AddPlaylistDto(RandomizerContext context, AddOrUpsertPlaylistDto payload)
	{
		return context.Playlists.Add(new()
		{
			PlaylistName = payload.PlaylistName,
			RemotePlaylistId = payload.RemotePlaylistId,
			RemotePlaylistType = payload.RemotePlaylistType,
			IsDisabled = payload.IsDisabled,
			PlaylistTracks = payload.Tracks.ConvertAll<PlaylistTrack>(y => new()
			{
				RemoteTrackId = y.RemoteTrackId,
				TrackName = y.TrackName,
			})
		});
	}
}