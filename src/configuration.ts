import getConfig from "next/config";
import { z } from "zod";

const publicConfigurationSchema = z.object({

})
export interface PublicConfiguration extends z.infer<typeof publicConfigurationSchema>{}
const privateConfigurationSchema = z.object({
	googleClientID: z.string().min(1),
	googleClientSecret: z.string().min(1),
	spotifyClientID: z.string().min(1),
	spotifyClientSecret: z.string().min(1),
	youtubeApiKey: z.string().min(1)
})
export interface PrivateConfiguration extends z.infer<typeof privateConfigurationSchema>{}

export function getPrivateConfiguration(){
	return privateConfigurationSchema.parse({
		googleClientID: process.env.GOOGLE_CLIENT_ID,
		googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
		spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
		spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		youtubeApiKey: process.env.YOUTUBE_API_KEY
	})
}
export function getPublicConfiguration(){
	const { publicRuntimeConfig } = getConfig();
	return publicConfigurationSchema.parse(publicRuntimeConfig)
}

