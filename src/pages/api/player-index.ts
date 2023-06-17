import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from "next-connect";
import { RequiredAuthorization } from "@/lib/middleware/auth-middleware";
import { onApiError } from '@/lib/middleware/on-api-error';
import { setUserPlayerIndex } from '@/lib/firestore/get-set-user-player';
import { setPlayerIndexRequestSchema } from '@/models/api-models/set-player-index';

const router = createRouter<NextApiRequest & { uid: string }, NextApiResponse>();

router
	.use(RequiredAuthorization())
	.put(
		async (req, res, _next) => {
			const payload = await setPlayerIndexRequestSchema.parseAsync(JSON.parse(req.body))
			await setUserPlayerIndex(req.uid, payload.newIndex)

			res.status(200).end()
		},
	)

export default router.handler({
	onError: onApiError,
})