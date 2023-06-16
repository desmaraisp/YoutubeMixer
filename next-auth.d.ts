import { type DefaultSession, type DefaultUser } from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user?: {
			id: string;
			provider?: string
		} & DefaultSession['user'];
	}

	interface User extends DefaultUser {
		id: string;
		provider?: string
	}
}



declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		provider?: string;
	}
}