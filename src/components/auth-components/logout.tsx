import { clientAuth } from "@/firebase-config";

export function Logout(){
	return (
		<>
			<button type="button" onClick={async () => await clientAuth.signOut()}>Log out</button>
		</>
	)
}