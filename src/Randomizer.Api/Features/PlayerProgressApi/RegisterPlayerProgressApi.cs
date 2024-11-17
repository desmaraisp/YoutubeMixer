using Randomizer.Api.Features.PlayerProgressApi.PlayerProgressService;

namespace Randomizer.Api.Features.PlayerProgressApi;

public static class WebApplicationBuilderExtensions
{
	public static WebApplicationBuilder RegisterPlayerProgressFeature(this WebApplicationBuilder builder)
	{
		builder.Services.AddScoped<IPlayerProgressService, PlayerProgressService.PlayerProgressService>();

		return builder;
	}
}