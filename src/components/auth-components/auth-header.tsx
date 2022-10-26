import { User } from "firebase/auth"
import Link from "next/link"
import { AuthenticationGuard } from "./authentication-guard"
import { Logout } from "./logout"

export function AuthHeader() {
	const authNode = (user: User) => (
		<>
			<span>Welcome, {user.uid}</span>
			<Link href="/auth/link-external-account">Link external account</Link>
			<Logout />
		</>
	)

	const unauthNode = () => (
		<>
			<Link href="/auth/register">Register</Link>
			<Link href="/auth/login">Login</Link>
		</>
	)

	const anonymousAuth = (_: User) => (
		<>
			<Link href="/auth/login">Login</Link>
			<Link href="/auth/upgrade-account">Upgrade anonymous account</Link>
			<Link href="/auth/link-external-account">Link external account</Link>
			<Logout />
		</>
	)




	return (
		<AuthenticationGuard
			authenticatedNode={authNode}
			unauthenticatedNode={unauthNode}
			anonymousNode={anonymousAuth}
		/>
	)
}