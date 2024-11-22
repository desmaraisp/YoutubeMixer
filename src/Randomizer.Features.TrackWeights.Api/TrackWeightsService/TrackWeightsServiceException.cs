namespace Randomizer.Features.TrackWeights.Api.TrackWeightsService;

public class TrackWeightsServiceException : Exception
{
	public TrackWeightsServiceException() { }
	public TrackWeightsServiceException(string message) : base(message) { }
	public TrackWeightsServiceException(string message, Exception inner) : base(message, inner) { }
}
public class TrackNotFoundException : TrackWeightsServiceException
{
	public TrackNotFoundException() { }
	public TrackNotFoundException(string message) : base(message) { }
	public TrackNotFoundException(string message, Exception innerException) : base(message, innerException) { }
}

public class PlayerNotFoundException : TrackWeightsServiceException
{
	public PlayerNotFoundException() { }
	public PlayerNotFoundException(string message) : base(message) { }
	public PlayerNotFoundException(string message, Exception innerException) : base(message, innerException) { }
}