import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RequiredAuthorization } from "@/lib/middleware/auth-middleware";
import { onApiError } from '@/lib/middleware/on-api-error';
import { DBPlayerModelValidator, getUserPlayer, setUserPlayer } from '@/lib/firestore/get-set-user-player';

const router = createRouter<NextApiRequest & { uid: string }, NextApiResponse>();

router
	.use(RequiredAuthorization())
	.get(
		async (req, res, _next) => {
			const userPlayer = await getUserPlayer(req.uid)

			res.status(200).json(userPlayer)
		},
	)
	.put(
		async (req, res, _next) => {
			const userPlayer = await DBPlayerModelValidator.parseAsync(req.body)
			await setUserPlayer(req.uid, userPlayer)

			res.status(200).end()
		},
	)

export default router.handler({
	onError: onApiError,
})