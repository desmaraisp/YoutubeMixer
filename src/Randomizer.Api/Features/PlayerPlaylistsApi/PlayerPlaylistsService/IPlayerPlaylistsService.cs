namespace Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;

public interface IPlayerPlaylistsService
{
	public Task<List<GetPlaylistDto>> GetPlayerPlaylists(string userId, Guid playerId);
	public Task DeletePlaylist(string userId, Guid playerPlaylistId);
	public Task<GetPlaylistDto> AddPlaylist(string userId, AddOrUpsertPlaylistDto payload);

	public Task<GetPlaylistDto> UpsertPlaylist(string userId, Guid playlistId, AddOrUpsertPlaylistDto payload);
}
