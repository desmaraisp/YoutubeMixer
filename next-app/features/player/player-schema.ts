import { z } from "zod";


export const PlayerSchema = z.object({
	currentTrackId: z.string().min(1),
});
export interface PlayerModel extends z.infer<typeof PlayerSchema> { }