using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace Randomizer.Api.Features.Auth;

public static class WebApplicationBuilderExtensions
{
	public static WebApplicationBuilder RegisterAuthenticationFeature(this WebApplicationBuilder builder)
	{
		builder.Services.AddOptions<AuthOptions>()
			.BindConfiguration("Authentication")
			.ValidateDataAnnotations()
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