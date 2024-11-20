namespace Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;
public interface IRemotePlaylistsService
{
	public Task<GetRemotePlaylistDto> GetPlaylistContents(string playlistId, CancellationToken cancellationToken);
}