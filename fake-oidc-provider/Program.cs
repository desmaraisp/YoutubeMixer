using System.Security.Claims;
using Duende.IdentityServer;
using Duende.IdentityServer.Hosting;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Test;

internal class Program
{
	private static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		builder.Services
			.AddAuthentication();
		builder.Services.AddAuthorization();

		builder.Services.AddRazorPages();

		builder.Services
			.AddIdentityServer()
			.AddDeveloperSigningCredential(persistKey: false)
			.AddInMemoryIdentityResources(new List<IdentityResource>() {
					new IdentityResources.OpenId(),
					new IdentityResources.Profile(),
					new IdentityResources.Email(),
			})
			.AddInMemoryClients(new List<Client>() {
				new Client {
					ClientId = "foo",
					Enabled = true,
					ClientName = "Example client application using client credentials",
					AllowedGrantTypes = GrantTypes.Code,
					ClientSecrets = new List<Secret> {new Secret("bar".Sha256())},
					AllowedScopes = {
						IdentityServerConstants.StandardScopes.OpenId,
						IdentityServerConstants.StandardScopes.Email,
						IdentityServerConstants.StandardScopes.Profile
					},
					RequirePkce = false,
					AlwaysIncludeUserClaimsInIdToken = true,
					RedirectUris = new List<string>() { "http://localhost:3000/api/auth/callback/customProvider" },
				}
			})
			.AddTestUsers(new List<TestUser>() {
				new TestUser {
					SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE",
					Username = "bob",
					Password = "bob",
					Claims = new List<Claim>() {
						new Claim ("email", "bob@example.com"),
						new Claim ("name", "bob-name"),
						new Claim ("picture", "picture-link")
					}
				}
			});

		var app = builder.Build();
		app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });

		app.UseDeveloperExceptionPage();
		app.UseIdentityServer();
		app.UseRouting();
		app.UseAuthentication();
		app.UseAuthorization();
		app.MapRazorPages();
		app.UseStaticFiles();

		app.Run();
	}
}