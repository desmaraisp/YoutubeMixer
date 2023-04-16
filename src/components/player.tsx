import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { flexboxVariants } from "@/styles/shared/flexbox.css";
import { uuidv4 } from "@firebase/util";
import { useContext, useEffect, useState } from "react";
import { incrementCurrentIndexToExternalStorage } from '../store/saved-tracks-reducer'
import { FirebaseAuthContext } from "./firebase-context";
import { SpotifyPlayer } from "./spotify-player";
import { YoutubePlayer } from "./youtube-player";

export function Player({ className }: { className?: string }) {
	const savedTracks = useAppSelector(state => state.playerReducer.playlistItems)
	const currentPlayerIndex = useAppSelector(state => state.playerReducer.currentIndex)
	const previousPlayerIndex = useAppSelector(state => state.playerReducer.previousPlayerIndex)
	const currentUser = useContext(FirebaseAuthContext).user
	const dispatch = useAppDispatch()
	const [playerKey, setPlayerKey] = useState(uuidv4())
	const currentTrack = savedTracks[currentPlayerIndex]

	useEffect(() => {
		if (savedTracks.length == 0 || !currentTrack || !currentUser) {
			return
		}

		if (previousPlayerIndex && currentTrack.itemID === savedTracks[previousPlayerIndex].itemID) {
			setPlayerKey(uuidv4())
		}
	}, [currentPlayerIndex, currentTrack, currentUser, previousPlayerIndex, savedTracks])


	if (savedTracks.length == 0 || !currentTrack || !currentUser) {
		return <></>
	}


	if (currentTrack.type === "Spotify") {
		return (
			<div className={className}>
				<SpotifyPlayer className={flexboxVariants.centered} uri={currentTrack.itemID} onEnded={
					() => {
						dispatch(incrementCurrentIndexToExternalStorage(currentUser))
					}
				}
					onReady={
						(emb) => {
							emb.play()
						}
					}
				/>
			</div>

		)
	}

	return (
		<div className={className}>
			<YoutubePlayer key={playerKey} uri={currentTrack.itemID} onEnded={
				() => {
					dispatch(incrementCurrentIndexToExternalStorage(currentUser))
				}
			}
				onReady={
					(player) => {
						player.playVideo()
					}
				}
			/>
		</div>
	)
}