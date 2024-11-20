namespace Randomizer.Api.Features.PlayerPlaylistsApi.PlayerPlaylistsService;


public class PlaylistServiceException : Exception
{
	public PlaylistServiceException() { }
	public PlaylistServiceException(string message) : base(message) { }
	public PlaylistServiceException(string message, Exception inner) : base(message, inner) { }
}

public class PlaylistServiceBusinessException : Exception
{
	public PlaylistServiceBusinessException() { }
	public PlaylistServiceBusinessException(string message) : base(message) { }
	public PlaylistServiceBusinessException(string message, Exception inner) : base(message, inner) { }
}

public class PlayerNotFoundException : PlaylistServiceBusinessException
{
	public PlayerNotFoundException() { }

	public PlayerNotFoundException(string message) : base(message) { }

	public PlayerNotFoundException(string message, Exception innerException) : base(message, innerException) { }
}