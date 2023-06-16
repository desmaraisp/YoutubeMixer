import { LandingMessage } from "@/components/landing-message"
import { Player } from "@/components/player"
import { PlaylistsDisplay } from "@/components/playlists-display"
import { TracksList } from "@/components/tracks-list"
import { PlayerContext, PlayerContextProvider } from "@/contexts/player-context"
import { PlayerModel } from "@/models/player-model"
import { playerWrapperStyle, playerStyle, tracksListStyle } from "@/styles/component-specific/player-style.css"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
// import { getSession, useSession } from "next-auth/react"
import { useContext } from "react"

export const getServerSideProps: GetServerSideProps<{ initialPlayerState: PlayerModel }> = async (context) => {
	// const session = await getSession({ req: context.req })

	return {
		props: {
			initialPlayerState: {
				currentIndex: 0,
				tracks: []
			}

		}
	}
}


export default function Home({
	initialPlayerState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<PlayerContextProvider serverSidePlayerState={initialPlayerState}>
			<_Home />
		</PlayerContextProvider>
	)
}

function _Home() {
	const { playerState } = useContext(PlayerContext)

	if (playerState.tracks.length == 0 || !playerState.tracks[playerState.currentIndex]) {
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