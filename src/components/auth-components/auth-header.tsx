import { User } from "next-auth"
import { AuthenticationGuard } from "./authentication-guard"
import { Logout } from "./logout"
import { Login } from "./login"

export function AuthHeader() {
	const authNode = (user: User) => (
		<>
			<span>Welcome, {user.id}</span>
			<Logout />
		</>
	)

	const unauthNode = () => (
		<>
			<Login />
		</>
	)

	return (
		<AuthenticationGuard
			authenticatedNode={authNode}
			unauthenticatedNode={unauthNode}
		/>
	)
}