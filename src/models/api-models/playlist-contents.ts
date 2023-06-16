import { z } from 'zod';
import { PlaylistTypesEnum } from '@/models/playlist-types';
import { trackSchema } from '@/models/track-model';



export const PlaylistContentsRequestSchema = z.object({
	playlistType: PlaylistTypesEnum,
	playlistID: z.string(),
});
export interface PlaylistContentsRequestModel extends z.infer<typeof PlaylistContentsRequestSchema> { }

export const PlaylistContentsResponseSchema = z.object({
	playlistName: z.string(),
	playlistItems: z.array(trackSchema),
	playlistType: PlaylistTypesEnum,
	playlistID: z.string(),
	playlistURL: z.string(),
	playlistImage: z.string()
});
export interface PlaylistContentsResponseModel extends z.infer<typeof PlaylistContentsResponseSchema> { }
