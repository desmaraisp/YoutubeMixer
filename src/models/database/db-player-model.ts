import { PlaylistItemValidator } from '../playlist-item';
import { z } from 'zod';


export const DBPlayerModelValidator = z.object({
	playlistItems: z.array(PlaylistItemValidator),
	currentIndex: z.number().gte(0)
});
export interface DBPlayerModel extends z.infer<typeof DBPlayerModelValidator> { }
