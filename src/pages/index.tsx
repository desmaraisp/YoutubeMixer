import { getAuthOptions } from "@/auth-options"
import { LandingMessage } from "@/components/landing-message"
import { Player } from "@/components/player"
import { PlaylistsDisplay } from "@/components/playlists-display"
import { TracksList } from "@/components/tracks-list"
import { PlayerContext, PlayerContextProvider } from "@/contexts/player-context"
import { UserPlaylistsContextProvider } from "@/contexts/user-playlists-context"
import { getUserPlayer } from "@/lib/firestore/get-set-user-player"
import { DBPlaylistsModel, getUserPlaylists } from "@/lib/firestore/get-set-user-playlists"
import { PlayerModel } from "@/models/player-model"
import { playerWrapperStyle, playerStyle, tracksListStyle } from "@/styles/component-specific/player-style.css"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { useContext } from "react"

export const getServerSideProps: GetServerSideProps<{ initialPlayerState: PlayerModel, initialUserPlaylists: DBPlaylistsModel }> = async (context) => {
	const session = await getServerSession(context.req, context.res, getAuthOptions())
	if (!session?.user?.id) {
		return {
			props: {
				initialPlayerState: {
					currentIndex: 0,
					tracks: []
				},
				initialUserPlaylists: {
					playlists: []
				}
			}
		}
	}
	const result = await Promise.all([
		getUserPlaylists(session?.user?.id),
		getUserPlayer(session?.user?.id)
	])
	return {
		props: {
			initialPlayerState: {
				currentIndex: result[1].currentIndex,
				tracks: result[1].playlistItems
			},
			initialUserPlaylists: {
				playlists: result[0].playlists
			}
		}
	}
}


export default function Home({
	initialPlayerState,
	initialUserPlaylists
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<PlayerContextProvider serverSidePlayerState={initialPlayerState}>
			<UserPlaylistsContextProvider serverSideUserPlaylists={initialUserPlaylists}>
				<_Home />
			</UserPlaylistsContextProvider>
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