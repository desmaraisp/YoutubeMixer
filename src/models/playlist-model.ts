import { PlaylistTypesEnum } from './playlist-types';
import { PlaylistItemValidator } from './playlist-item'
import {z} from 'zod'

export const PlaylistModelValidator = z.object({
	playlistName: z.string(),
	playlistItems: z.array(PlaylistItemValidator),
	enabled: z.boolean(),
	uuid: z.string(),
	playlistType: PlaylistTypesEnum,
	playlistID: z.string(),
	playlistURL: z.string(),
	playlistImage: z.string()
})
export interface PlaylistModel extends z.infer<typeof PlaylistModelValidator>{}



