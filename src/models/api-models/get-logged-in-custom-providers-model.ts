import { z } from 'zod';
import { ApiErrorResponseSchema } from './api-error-response';


export const GetLoggedInCustomProvidersSuccessResponseSchema = z.object({
	isSpotifyLoggedIn: z.boolean(),
	isGoogleLoggedIn: z.boolean()
});
export const GetLoggedInCustomProvidersResponseSchema = z.union([ApiErrorResponseSchema, GetLoggedInCustomProvidersSuccessResponseSchema]);

export interface GetLoggedInCustomProvidersSuccessResponse extends z.infer<typeof GetLoggedInCustomProvidersSuccessResponseSchema> { }
export type GetLoggedInCustomProvidersResponse = z.infer<typeof GetLoggedInCustomProvidersResponseSchema>
