import { getFirebaseConfig } from "@/firebase-config";

export function Logout(){
	return (
		<>
			<button type="button" onClick={async () => await getFirebaseConfig().clientAuth.signOut()}>Log out</button>
		</>
	)
}