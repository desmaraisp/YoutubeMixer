import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RequiredAuthorization } from "@/lib/middleware/auth-middleware";
import { onApiError } from '@/lib/middleware/on-api-error';
import { getUserPlaylists, setUserPlaylists } from '@/lib/firestore/get-set-user-playlists';
import { playlistsSchema } from '@/models/playlists-model';

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
			const userPlaylists = await playlistsSchema.parseAsync(JSON.parse(req.body))
			await setUserPlaylists(req.uid, userPlaylists)

			res.status(200).end()
		},
	)

export default router.handler({
	onError: onApiError,
})