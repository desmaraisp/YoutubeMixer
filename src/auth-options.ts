import { AuthOptions } from "next-auth"
import { Provider } from "next-auth/providers"


export function getAuthOptions() {
	var providers: Provider[];

	if(process.env.NODE_ENV == 'development'){
		providers = [{
			id: "customProvider",
			name: "customProvider",
			clientId: "foo",
			clientSecret: "bar",
			type: "oauth",
			wellKnown: "http://localhost:5227/.well-known/openid-configuration",
			authorization: {
				params: { scope: "openid email profile" },
			},
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email, 
					image: profile?.picture ?? "",
				}
			}
		}]
	}

	else{
		providers = [
			
		]
	}
	



	const authOptions: AuthOptions = {
		providers: providers,
		callbacks: {
			session: async ({ session, user, token }) => {
				if(session.user){
					session.user.id = (token?.provider ?? "") + (token?.sub ?? "")
				}

				return session;
			},
			jwt: async ({ token, user, account }) => {
				if (user) {
					token.provider = account?.provider
				}

				return token
			}
		}
	}

	return authOptions
}
