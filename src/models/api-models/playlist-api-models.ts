import { PlaylistTypesEnum } from '../playlist-types';
import { PlaylistItemValidator } from '../playlist-item';
import { z } from 'zod';
import { ApiErrorResponseSchema } from './api-error-response';



export const PlaylistRequestModelValidator = z.object({
	playlistType: PlaylistTypesEnum,
	playlistID: z.string(),
});
export interface PlaylistRequestModel extends z.infer<typeof PlaylistRequestModelValidator> { }

export const PlaylistSuccessResponseSchema = z.object({
	playlistName: z.string(),
	playlistItems: z.array(PlaylistItemValidator),
	playlistType: PlaylistTypesEnum,
	playlistID: z.string(),
	playlistURL: z.string(),
	playlistImage: z.string()
});


export const PlaylistResponseSchema = z.union([ApiErrorResponseSchema, PlaylistSuccessResponseSchema]);
export type PlaylistResponseModel = z.infer<typeof PlaylistResponseSchema>
export interface PlaylistSuccessResponseModel extends z.infer<typeof PlaylistSuccessResponseSchema> { }
