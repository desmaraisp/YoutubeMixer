import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler, createRouter } from "next-connect";
import { prismaClient } from "@/globals/prisma-client";
import { z } from "zod";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { PlaylistTrackModelWithTrackType, PlaylistTrackSchemaForPatch, PlaylistTrackSchemaWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { RequiredAuthorization } from "@/middleware/api-auth-middleware";
import { User } from "@supabase/supabase-js";

const router = createRouter<NextApiRequest & { user: User }, NextApiResponse>();
export const playlistItemsPatchRouteConfig: RouteConfig = {
	method: 'patch',
	path: '/api/playlist-items',
	request: {
		body: {
			content: {
				'application/json': {
					schema: z.array(PlaylistTrackSchemaForPatch)
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Success.',
			content: {
				'application/json': {
					schema: z.array(PlaylistTrackSchemaWithTrackType)
				}
			}
		}
	},
}


router
	.use(RequiredAuthorization())
	.patch(
		async (req, res, _next) => {
			const payload = await z.array(PlaylistTrackSchemaForPatch).parseAsync(req.body)

			const result = await prismaClient.$transaction(async (tr) => {
				await tr.player.deleteMany({
					where: { userId: req.user.id },
				})
				return await Promise.all(
					payload.map(async (x) => await tr.playlistTrack.update({
						where: {
							playlist: { userId: req.user.id },
							playlistTrackId: x.trackId
						},
						data: {
							orderingKey: x.orderingKey
						},
						include: {
							playlist: { select: { playlistType: true } }
						}
					}))
				)
			})

			const response: PlaylistTrackModelWithTrackType[] = result.map(x => ({
				remoteTrackId: x.remoteTrackId,
				trackId: x.playlistTrackId,
				trackName: x.itemName,
				trackType: x.playlist.playlistType
			}))
			res.status(200).json(response)
		},
	)

export default router.handler({
	onError: onApiError,
})