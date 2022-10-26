import { applicationConstants } from "@/constants";
import { DBPlayerModel } from "@/models/database/db-player-model";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { clientDB } from "../../firebase-config";

export async function setPlayer(user: User, playerState: DBPlayerModel){
	const docRef = doc(
		clientDB,
		applicationConstants.fireStoreConstants.playerCollection,
		user.uid
	)
	await setDoc(docRef, playerState)
}