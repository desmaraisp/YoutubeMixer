namespace Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;

public class PlayerProgressException : Exception
{
	public PlayerProgressException() { }
	public PlayerProgressException(string message) : base(message) { }
	public PlayerProgressException(string message, Exception inner) : base(message, inner) { }
}

public class PlayerProgressBusinessException : PlayerProgressException
{
	public PlayerProgressBusinessException() { }
	public PlayerProgressBusinessException(string message) : base(message) { }
	public PlayerProgressBusinessException(string message, Exception inner) : base(message, inner) { }
}

public class PlayerNotFoundException : PlayerProgressBusinessException
{
	public PlayerNotFoundException() { }
	public PlayerNotFoundException(string message) : base(message) { }
	public PlayerNotFoundException(string message, Exception inner) : base(message, inner) { }
}


public class PlayerTrackNotFoundException : PlayerProgressBusinessException
{
	public PlayerTrackNotFoundException() { }
	public PlayerTrackNotFoundException(string message) : base(message) { }
	public PlayerTrackNotFoundException(string message, Exception inner) : base(message, inner) { }
}