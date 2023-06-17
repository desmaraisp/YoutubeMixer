import { z } from "zod";

export const setPlayerIndexRequestSchema = z.object({
	newIndex: z.number().gte(0)
})
export interface SetPlayerIndexRequestModel extends z.infer<typeof setPlayerIndexRequestSchema> { }
