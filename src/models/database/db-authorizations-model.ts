import { z } from "zod";

export const DBAuthorizationsModelValidator = z.object({
	googleRefreshToken: z.optional(z.string()),
	spotifyRefreshToken: z.optional(z.string())
});
export interface DBAuthorizationsModel extends z.infer<typeof DBAuthorizationsModelValidator> { }
