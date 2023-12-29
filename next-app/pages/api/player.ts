import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { prismaClient } from "@/globals/prisma-client";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { contentTypeFilterMiddleware } from "@/middleware/content-type-filter";
import { PlayerModel, PlayerSchema } from "@/features/player/player-schema";

const router = createRouter<NextApiRequest, NextApiResponse>();
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
		async (req, res, _next) => {
			const payload = await PlayerSchema.parseAsync(req.body)

			const createdPlayer = await prismaClient.player.upsert({
				where: {
					userId: 'null'
				},
				update: {
					currentTrackId: payload.currentTrackId
				},
				create: {
					userId: 'null',
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