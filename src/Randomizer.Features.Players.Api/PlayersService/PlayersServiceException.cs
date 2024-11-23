namespace Randomizer.Features.Players.Api.PlayersService;

public class PlayersServiceException : Exception
{
	public PlayersServiceException() { }
	public PlayersServiceException(string message) : base(message) { }
	public PlayersServiceException(string message, Exception inner) : base(message, inner) { }
}

public class PlayerNameAlreadyUsedException : PlayersServiceException
{
	public PlayerNameAlreadyUsedException() { }
	public PlayerNameAlreadyUsedException(string message) : base(message) { }
	public PlayerNameAlreadyUsedException(string message, Exception inner) : base(message, inner) { }
}
public class PlayerNotFoundException : PlayersServiceException
{
	public PlayerNotFoundException() { }
	public PlayerNotFoundException(string message) : base(message) { }
	public PlayerNotFoundException(string message, Exception inner) : base(message, inner) { }
}