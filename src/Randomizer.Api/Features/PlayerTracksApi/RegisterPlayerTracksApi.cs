using Randomizer.Api.Features.PlayerTracksApi.PlayerTracksService;

namespace Randomizer.Api.Features.PlayerTracksApi;

public static class WebApplicationBuilderExtensions
{
	public static WebApplicationBuilder RegisterPlayerTracksApiFeature(this WebApplicationBuilder builder)
	{
		builder.Services.AddScoped<IPlayerTracksService, PlayerTracksService.PlayerTracksService>();

		return builder;
	}
}