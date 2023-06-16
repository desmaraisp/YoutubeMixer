import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RequiredAuthorization } from "@/lib/middleware/auth-middleware";
import { onApiError } from '@/lib/middleware/on-api-error';
import { DBPlaylistsModelSchema, getUserPlaylists, setUserPlaylists } from '@/lib/firestore/get-set-user-playlists';

const router = createRouter<NextApiRequest & { uid: string }, NextApiResponse>();

router
	.use(RequiredAuthorization())
	.get(
		async (req, res, _next) => {
			const userPlaylists = await getUserPlaylists(req.uid)

			res.status(200).json(userPlaylists)
		},
	)
	.put(
		async (req, res, _next) => {
			const userPlaylists = await DBPlaylistsModelSchema.parseAsync(req.body)
			await setUserPlaylists(req.uid, userPlaylists)

			res.status(200).end()
		},
	)

export default router.handler({
	onError: onApiError,
})