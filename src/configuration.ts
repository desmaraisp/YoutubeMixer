import getConfig from "next/config";
import { z } from "zod";

const publicConfigurationSchema = z.object({
	projectID: z.string().min(1),
	firebaseApiKey: z.string().min(1),
	firebaseAuthDomain: z.string().min(1),
	firebaseStorageBucket: z.string().min(1),
	firebaseMessagingSenderId: z.string().min(1),
	firebaseAppID: z.string().min(1)
})
export interface PublicConfiguration extends z.infer<typeof publicConfigurationSchema>{}
const privateConfigurationSchema = z.object({
	firebaseClientEmail: z.string().optional(),
	firebasePrivateKey: z.string().optional(),
	googleClientID: z.string().min(1),
	googleClientSecret: z.string().min(1),
	spotifyClientID: z.string().min(1),
	spotifyClientSecret: z.string().min(1),
	youtubeApiKey: z.string().min(1)
})
export interface PrivateConfiguration extends z.infer<typeof privateConfigurationSchema>{}
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
export const privateConfiguration = privateConfigurationSchema.parse(serverRuntimeConfig)
export const publicConfiguration = publicConfigurationSchema.parse(publicRuntimeConfig)
