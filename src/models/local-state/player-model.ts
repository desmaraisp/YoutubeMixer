import { PlaylistItemValidator } from '../playlist-item'
import {z} from 'zod'

export const PlayerModelValidator = z.object({
	playlistItems: z.array(PlaylistItemValidator),
	currentIndex: z.number().gte(0),
	previousPlayerIndex: z.nullable( z.number().gte(0) )
})
export interface PlayerModel extends z.infer<typeof PlayerModelValidator>{}

