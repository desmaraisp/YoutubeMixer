import { signOut } from "next-auth/react"

export function Logout(){
	return (
		<>
			<button type="button" onClick={async () => signOut()}>Log out</button>
		</>
	)
}