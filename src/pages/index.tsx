import { FirebaseAuthContext } from '@/components/firebase-context'
import { LandingMessage } from '@/components/landing-message'
import { Player } from '@/components/player'
import { PlaylistsDisplay } from '@/components/playlists-display'
import { TracksList } from '@/components/tracks-list'
import { useAppSelector } from '@/store/hooks'
import { playerStyle, playerWrapperStyle, tracksListStyle } from '@/styles/component-specific/player-style.css'
import { useContext } from 'react'


export default function Home() {
	const savedTracks = useAppSelector(state => state.playerReducer.playlistItems)
	const currentPlayerIndex = useAppSelector(state => state.playerReducer.currentIndex)
	const currentUser = useContext(FirebaseAuthContext).user

	if (savedTracks.length == 0 || !savedTracks[currentPlayerIndex] || !currentUser) {
		return (
			<>
				<LandingMessage />
			</>
		)
	}

	return (
		<>
			<PlaylistsDisplay />

			<div className={playerWrapperStyle}>
				<Player className={playerStyle} />
				<TracksList className={tracksListStyle} />

			</div>
		</>
	)
}
