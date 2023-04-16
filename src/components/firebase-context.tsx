import { applicationConstants } from "@/constants";
import { DBPlayerModelValidator } from "@/models/database/db-player-model";
import { PlaylistsModelValidator } from "@/models/local-state/playlists-model";
import { clientAuth, clientDB } from "@/firebase-config";
import { useAppDispatch } from "@/store/hooks";
import { savePlaylistsToRedux } from "@/store/saved-playlists-reducer";
import { setPlayerStateToRedux } from "@/store/saved-tracks-reducer";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

interface firebaseContextData {
	user: User|null,
	isLoading: boolean
}
export const FirebaseAuthContext = createContext<firebaseContextData>({user: null, isLoading: true});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useAppDispatch()

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(clientAuth, (newUser) => {
			setUser(newUser)
			setIsLoading(false)
		})

		return () => { unsubscribe(); setIsLoading(true) }
	}, [])

	useEffect(() => {
		if (!user?.uid) {
			dispatch(savePlaylistsToRedux([]))
			return
		}

		const docRef = doc(clientDB, applicationConstants.fireStoreConstants.playlistsCollection, user.uid)
		const unsubscribe = onSnapshot(docRef, async (doc) => {
			const docData = doc.data()
			if (!docData) return

			const newPlaylists = PlaylistsModelValidator.parse(docData)
			dispatch(savePlaylistsToRedux(
				newPlaylists.playlists
			))
		})

		return unsubscribe
	}, [dispatch, user?.uid])

	useEffect(() => {
		if (!user?.uid) {
			dispatch(setPlayerStateToRedux({ currentIndex: 0, playlistItems: [] }))
			return
		}


		const docRef = doc(clientDB, applicationConstants.fireStoreConstants.playerCollection, user.uid)
		const unsubscribe = onSnapshot(docRef, async (doc) => {
			const docData = doc.data()
			if (!docData) return

			const newPlayerState = DBPlayerModelValidator.parse(docData)
			dispatch(setPlayerStateToRedux(newPlayerState))
		})

		return unsubscribe
	}, [dispatch, user?.uid])

	return (
		<FirebaseAuthContext.Provider value={{user: user, isLoading: isLoading}}>
			{children}
		</FirebaseAuthContext.Provider>
	)
}