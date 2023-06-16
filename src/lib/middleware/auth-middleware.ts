import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import { UnauthorizedException } from '@/models/exceptions/custom-exceptions';
import { getAuthOptions } from '@/auth-options';
import { getServerSession } from 'next-auth';

export function RequiredAuthorization() {
	return async (req: NextApiRequest & { uid: string; }, res: NextApiResponse, next: NextHandler) => {
		const session = await getServerSession(req, res, getAuthOptions())

		if (!session) {
			throw new UnauthorizedException();
		}
	
		req.uid = session.user?.id ?? (() => {throw new Error("Invalid user id")})()
		return await next();
	};
}
export function OptionalAuthorization() {
	return async (req: NextApiRequest & { uid?: string; }, res: NextApiResponse, next: NextHandler) => {
		const session = await getServerSession(req, res, getAuthOptions())

		if (session) {
			req.uid = session.user?.id
		}
		
		return await next();
	};
}