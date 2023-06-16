import { trackSchema } from './track-model'
import { z } from 'zod'

export const playerSchema = z.object({
	tracks: z.array(trackSchema),
	currentIndex: z.number().gte(0),
})
export interface PlayerModel extends z.infer<typeof playerSchema> { }

