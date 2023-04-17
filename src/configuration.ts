const throwValidationError = (key: string) => {
	throw new Error(`Missing var ${key}`)
}

export const applicationConfig = {
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.FIREBASE_PRIVATE_KEY,
	publicProjectID: process.env.NEXT_PUBLIC_ProjectId ?? throwValidationError("NEXT_PUBLIC_ProjectId"),
	publicAPIKey: process.env.NEXT_PUBLIC_ApiKey ?? throwValidationError("NEXT_PUBLIC_ProjectId"),
	publicAuthDomain: process.env.NEXT_PUBLIC_AuthDomain ?? throwValidationError("NEXT_PUBLIC_ProjectId"),
	publicStorageBucket: process.env.NEXT_PUBLIC_StorageBucket ?? throwValidationError("NEXT_PUBLIC_ProjectId"),
	publicMessagingSenderId: process.env.NEXT_PUBLIC_MessagingSenderId ?? throwValidationError("NEXT_PUBLIC_ProjectId"),
	publicAppID: process.env.NEXT_PUBLIC_AppId ?? throwValidationError("NEXT_PUBLIC_ProjectId"),
	googleClientID: process.env.GOOGLE_CLIENT_ID ?? throwValidationError("GOOGLE_CLIENT_ID"),
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? throwValidationError("GOOGLE_CLIENT_SECRET"),
	spotifyClientID: process.env.SPOTIFY_CLIENT_ID ?? throwValidationError("SPOTIFY_CLIENT_ID"),
	spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? throwValidationError("SPOTIFY_CLIENT_SECRET"),
	youtubeAPIKey: process.env.Youtube_API_Key ?? throwValidationError("Youtube_API_Key")
}