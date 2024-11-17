using System.Net;

namespace Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;

public class RemotePlaylistServiceException : Exception
{
	public RemotePlaylistServiceException() { }
	public RemotePlaylistServiceException(string message) : base(message) { }
	public RemotePlaylistServiceException(string message, Exception inner) : base(message, inner) { }
}

public class RemotePlaylistNotFoundException : RemotePlaylistServiceException
{
	public RemotePlaylistNotFoundException() { }
	public RemotePlaylistNotFoundException(string message) : base(message) { }
	public RemotePlaylistNotFoundException(string message, Exception inner) : base(message, inner) { }
}

public class RemotePlaylistApiException : RemotePlaylistServiceException
{
	public string? Response { get; init; }
	public HttpStatusCode StatusCode { get; init; }
	public RemotePlaylistApiException() { }
	public RemotePlaylistApiException(string message) : base(message) { }
	public RemotePlaylistApiException(string message, Exception inner) : base(message, inner) { }
}