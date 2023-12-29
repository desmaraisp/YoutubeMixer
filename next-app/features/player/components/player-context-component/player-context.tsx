import { PlaylistTrackModelWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { SendJsonRequest } from "@/lib/send-request";
import { Alert } from "@mantine/core";
import { ReactNode, SetStateAction, createContext, useState } from "react";
import { PlayerModel } from "../../player-schema";

type ContextReturnType = {
	currentTrackId: string,
	setCurrentTrackId: (dispatchAction: SetStateAction<string>) => Promise<void>
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
	return <InnerProvider currentPlayingTrack={currentPlayingTrackId} currentTracks={tracksList}>
		{children}
	</InnerProvider>;
}

function InnerProvider({ currentPlayingTrack, currentTracks, children }: { currentPlayingTrack: string; currentTracks: PlaylistTrackModelWithTrackType[]; children: ReactNode; }) {
	const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<string>(currentPlayingTrack);

	if (!currentTracks.filter(x => x.remoteTrackId === currentlyPlayingTrack)) {
		<Alert>Your local status is out of sync with the centralized player status. To fix this, refresh the page</Alert>;
	}

	return (
		<PlayerContext.Provider value={{
			currentTrackId: currentlyPlayingTrack,
			setCurrentTrackId: async (dispatchAction) => {
				setCurrentlyPlayingTrack(dispatchAction)
				await SendJsonRequest(
					{ currentTrackId: currentlyPlayingTrack } as PlayerModel,
					"/api/player",
					"put"
				);
			},
			tracksList: currentTracks,
			getCurrentTrackFromId: () => {
				const result = currentTracks.find(x => x.trackId === currentPlayingTrack)
				if(!result)  throw new Error('Could not find current track')
				return result
			}
		}}>
			{children}
		</PlayerContext.Provider>
	);
}
