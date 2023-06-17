import { Logout } from "./logout"
import { Login } from "./login"
import Link from "next/link"
import { useSession } from "next-auth/react"

export function AuthHeader() {
	const { data } = useSession()

	if (data?.user?.id) {
		return (
			<>
				<span>Welcome, {data?.user.id}</span>
				<Logout />
				<Link href="/auth/link-external-account">Link external account</Link>
			</>
		)
	}

	return (
		<>
			<Login />
		</>
	)
}