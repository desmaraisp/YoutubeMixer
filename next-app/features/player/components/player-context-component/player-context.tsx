import { PlaylistTrackModelWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { SendJsonRequest } from "@/lib/send-request";
import { Alert } from "@mantine/core";
import { ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { PlayerModel } from "../../player-schema";
import { useRouter } from "next/router";

type ContextReturnType = {
	currentTrackId: string,
	setCurrentTrackId: (newTrackId: string) => Promise<void>
	tracksList: PlaylistTrackModelWithTrackType[],
	getCurrentTrackFromId: () => PlaylistTrackModelWithTrackType
};

export const PlayerContext = createContext<ContextReturnType>({
	currentTrackId: '',
	setCurrentTrackId: () => null as any,
	tracksList: [],
	getCurrentTrackFromId: () => null as any
});

type ContextProviderProps = {
	children: ReactNode;
	currentPlayingTrackId: string | null;
	tracksList: PlaylistTrackModelWithTrackType[]
};

export function PlayerContextProvider({ children, currentPlayingTrackId, tracksList }: ContextProviderProps) {
	if (tracksList.length === 0) return <Alert>No tracks for now</Alert>

	if (!currentPlayingTrackId) {
		currentPlayingTrackId = tracksList[0].trackId
	}
	return <InnerProvider initialPlayingTrack={currentPlayingTrackId} currentTracks={tracksList}>
		{children}
	</InnerProvider>;
}

function InnerProvider({ initialPlayingTrack, currentTracks, children }: { initialPlayingTrack: string; currentTracks: PlaylistTrackModelWithTrackType[]; children: ReactNode; }) {
	const router = useRouter()
	if (!currentTracks.filter(x => x.remoteTrackId === initialPlayingTrack)) {
		<Alert>Your local status is out of sync with the centralized player status. To fix this, refresh the page</Alert>;
	}

	return (
		<PlayerContext.Provider value={{
			currentTrackId: initialPlayingTrack,
			setCurrentTrackId: async (newTrackId) => {
				await SendJsonRequest(
					{ currentTrackId: newTrackId } as PlayerModel,
					"/api/player",
					"put"
				);
				router.push(router.asPath)
			},
			tracksList: currentTracks,
			getCurrentTrackFromId: () => {
				const result = currentTracks.find(x => x.trackId === initialPlayingTrack)
				if(!result)  throw new Error('Could not find current track')
				return result
			}
		}}>
			{children}
		</PlayerContext.Provider>
	);
}
