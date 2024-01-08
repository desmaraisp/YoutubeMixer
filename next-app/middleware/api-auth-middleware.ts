import { ErrorWithHTTPCode } from '@/exceptions/error-with-http-code';
import { createServerClient } from '@supabase/ssr';
import { User } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export function RequiredAuthorization() {
	return async (req: NextApiRequest & { user: User }, _res: NextApiResponse, next: NextHandler) => {
		const user = await internalMiddleware(req);

		if (!user) throw new ErrorWithHTTPCode('Access denied', 403)

		req.user = user
		return await next()
	};
}
export function OptionalAuthorization() {
	return async (req: NextApiRequest & { user: User | null }, _res: NextApiResponse, next: NextHandler) => {
		const user = await internalMiddleware(req);
		req.user = user

		return await next()
	};
}



async function internalMiddleware(req: NextApiRequest & { uid?: string | undefined; }) {
	const supabaseClient = createServerClient(
		process.env.PUBLIC_SUPABASE_URL!,
		process.env.PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return req.cookies[name];
				}
			},
		}
	)

	return (await supabaseClient.auth.getSession()).data.session?.user ?? null
}
