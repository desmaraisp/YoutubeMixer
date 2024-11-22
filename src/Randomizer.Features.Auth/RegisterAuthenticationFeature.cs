using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace Randomizer.Features.Auth;

public static class WebApplicationBuilderExtensions
{
	public static IHostApplicationBuilder RegisterAuthenticationFeature(this IHostApplicationBuilder builder)
	{
		builder.Services.AddSingleton<IValidateOptions<AuthOptions>, ValidateAuthOptions>();

		builder.Services.AddOptions<AuthOptions>()
			.BindConfiguration("Authentication")
			.ValidateOnStart();

		builder.Services.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme).Configure<IOptions<AuthOptions>>((c, options) =>
		{
			c.MetadataAddress = options.Value.MetadataAddress;
		});

		builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme);

		return builder;
	}
}