import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { prismaClient } from "@/globals/prisma-client";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { contentTypeFilterMiddleware } from "@/middleware/content-type-filter";
import { PlayerModel, PlayerSchema } from "@/features/player/player-schema";
import { User } from "@supabase/supabase-js";
import { RequiredAuthorization } from "@/middleware/api-auth-middleware";

const router = createRouter<NextApiRequest & { user: User }, NextApiResponse>();
export const playerRouteConfig: RouteConfig = {
	method: 'put',
	path: '/api/player',
	request: {
		body: {
			content: {
				'application/json': {
					schema: PlayerSchema
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Success.',
			content: {
				'application/json': {
					schema: PlayerSchema
				}
			}
		}
	},
}

router
	.put(
		contentTypeFilterMiddleware('application/json'),
		RequiredAuthorization(),
		async (req, res, _next) => {
			const payload = await PlayerSchema.parseAsync(req.body)

			const createdPlayer = await prismaClient.player.upsert({
				where: {
					userId: req.user.id
				},
				update: {
					currentTrackId: payload.currentTrackId
				},
				create: {
					userId: req.user.id,
					currentTrackId: payload.currentTrackId,
				}
			})

			const response: PlayerModel = {
				currentTrackId: createdPlayer.currentTrackId	
			};
			res.status(200).json(response)
		},
	)

export default router.handler({
	onError: onApiError,
})