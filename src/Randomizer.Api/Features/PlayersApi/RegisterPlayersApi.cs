using Randomizer.Api.Features.PlayersApi.PlayersService;

namespace Randomizer.Api.Features.PlayersApi;

public static class WebApplicationBuilderExtensions {
	public static WebApplicationBuilder RegisterPlayersApiFeature(this WebApplicationBuilder builder) {
		builder.Services.AddScoped<IPlayersService, PlayersService.PlayersService>();

		return builder;
	}
}