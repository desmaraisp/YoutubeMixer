import { onApiError } from "@/middleware/api-error-handler";
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler, createRouter } from "next-connect";
import { prismaClient } from "@/globals/prisma-client";
import { z } from "zod";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { PlaylistTrackModelWithTrackType, PlaylistTrackSchemaForPatch, PlaylistTrackSchemaWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { RequiredAuthorization } from "@/middleware/api-auth-middleware";
import { User } from "@supabase/supabase-js";
import { Prisma } from "@prisma/client";

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
					schema: z.object({itemsUpdated: z.number()})
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
				return await tr.$executeRaw`
					WITH updated(id, orderingKey) AS (VALUES
						${Prisma.join(
							payload.map((item) => Prisma.sql`(${item.trackId}, ${item.orderingKey})`)
						)}
					), userPlaylistTracks as (
						select * from "private"."PlaylistTrack"
						join "private"."Playlist" on "private"."PlaylistTrack"."playlistId"="private"."Playlist"."playlistId"
						join updated on "private"."PlaylistTrack"."playlistTrackId"=updated.id
						where "private"."Playlist"."userId"=${req.user.id}
					)

					UPDATE "private"."PlaylistTrack"
					SET "orderingKey" = userPlaylistTracks.orderingKey
					FROM userPlaylistTracks
					WHERE "private"."PlaylistTrack"."playlistTrackId" = userPlaylistTracks.id
				`
			})

			res.status(200).json({itemsUpdated: result})
		},
	)

export default router.handler({
	onError: onApiError,
})