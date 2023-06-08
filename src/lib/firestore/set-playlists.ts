import { applicationConstants } from "@/constants";
import { PlaylistsModel } from "@/models/local-state/playlists-model";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirebaseConfig } from "../../firebase-config";

export async function setPlaylists(user: User, playlists: PlaylistsModel){
	const docRef = doc(
		getFirebaseConfig().clientDB,
		applicationConstants.fireStoreConstants.playlistsCollection,
		user.uid
	)
	await setDoc(docRef, playlists)
}