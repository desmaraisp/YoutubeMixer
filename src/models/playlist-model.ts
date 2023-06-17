import { PlaylistTypesEnum } from './playlist-types';
import { trackSchema } from './track-model'
import {z} from 'zod'

export const playlistSchema = z.object({
	playlistName: z.string(),
	playlistItems: z.array(trackSchema),
	enabled: z.boolean(),
	uuid: z.string(),
	playlistType: PlaylistTypesEnum,
	playlistID: z.string(),
	playlistURL: z.string(),
	playlistImage: z.string()
})
export interface PlaylistModel extends z.infer<typeof playlistSchema>{}



