using Google.Apis.YouTube.v3;
using Microsoft.Extensions.Options;
using Randomizer.Api.Features.RemotePlaylistsApi.RemotePlaylistsService;
using Randomizer.Dal;

namespace Randomizer.Api.Features.RemotePlaylistsApi;

public static class WebApplicationBuilderExtensions
{
	public static WebApplicationBuilder RegisterRemotePlaylistsApiFeature(this WebApplicationBuilder builder)
	{
		builder.Services
					.AddKeyedScoped<IRemotePlaylistsService, SpotifyPlaylistsService>(MusicProvider.Spotify)
					.AddKeyedScoped<IRemotePlaylistsService, YoutubePlaylistsService>(MusicProvider.Youtube)
					.AddSingleton<YouTubeService>();

		builder.Services.AddOptions<RemotePlaylistsServiceOptions>()
					.BindConfiguration("RemotePlaylistsService")
					.ValidateDataAnnotations()
					.ValidateOnStart();

		builder.Services.AddHttpClient<IRemotePlaylistsService, SpotifyPlaylistsService>(client =>
		{
			client.BaseAddress = new Uri("https://api.spotify.com/");
		})
		.AddClientCredentialsTokenHandler("spotify.clientCredentials");

		builder.Services.AddDistributedMemoryCache();

		builder.Services.AddClientCredentialsTokenManagement();
		builder.Services.AddOptions<Duende.AccessTokenManagement.ClientCredentialsClient>("spotify.clientCredentials")
		.Configure<IOptions<RemotePlaylistsServiceOptions>>((client, options) =>
		{
			client.ClientId = options.Value.ClientId;
			client.ClientSecret = options.Value.ClientSecret;
			client.TokenEndpoint = "https://accounts.spotify.com/api/token";
		});

		return builder;
	}
}