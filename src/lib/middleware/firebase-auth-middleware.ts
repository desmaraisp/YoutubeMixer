import { NextApiRequest, NextApiResponse } from 'next';
import { adminAuth } from '@/firebase-admin-config';
import { NextHandler } from 'next-connect';
import { UnauthorizedException } from '@/models/exceptions/custom-exceptions';

export function RequiredAuthorization() {
	return async (req: NextApiRequest & { uid: string; }, _res: NextApiResponse, next: NextHandler) => {
		if(!req.headers.authorization){
			throw new UnauthorizedException()
		}
		
		return await internalMiddleware(req, next, req.headers.authorization);
	};
}
export function OptionalAuthorization() {
	return async (req: NextApiRequest & { uid?: string; }, _res: NextApiResponse, next: NextHandler) => {
		if(!req.headers.authorization){
			return await next()
		}
		
		return await internalMiddleware(req, next, req.headers.authorization);
	};
}



async function internalMiddleware(req: NextApiRequest & { uid?: string | undefined; }, next: NextHandler, auth: string) {
	const decodedToken = await adminAuth.verifyIdToken(auth);

	if (!decodedToken.uid) {
		throw new UnauthorizedException();
	}

	req.uid = decodedToken.uid;
	return await next();
}

