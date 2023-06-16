import { z } from 'zod';


export const TokensApiResponseSchema = z.object({
	isSpotifyLoggedIn: z.boolean(),
	isGoogleLoggedIn: z.boolean()
});
export type TokensApiResponseModel = z.infer<typeof TokensApiResponseSchema>;
