import { PlaylistTrackModelWithTrackType } from "@/features/playlist-track/playlist-track-schema";
import { SendJsonRequest } from "@/lib/send-request";
import { Alert } from "@mantine/core";
import { ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from "react";
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
	const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState<string>(initialPlayingTrack);
	useEffect(() => {
		setCurrentlyPlayingTrack(initialPlayingTrack)
	}, [initialPlayingTrack, setCurrentlyPlayingTrack])

	const setCurrentTrackId = useCallback<(string: string) => Promise<void>>(async (newTrackId) => {
		setCurrentlyPlayingTrack(newTrackId)
		await SendJsonRequest(
			{ currentTrackId: newTrackId } as PlayerModel,
			"/api/player",
			"put"
		);
	}, [setCurrentlyPlayingTrack])

	const getCurrentTrackFromId = useCallback(() => {
		const result = currentTracks.find(x => x.trackId === currentlyPlayingTrack)
		if(!result)  throw new Error('Could not find current track')
		return result
	}, [currentTracks, currentlyPlayingTrack])

	if (!currentTracks.filter(x => x.remoteTrackId === currentlyPlayingTrack)) {
		<Alert>Your local status is out of sync with the centralized player status. To fix this, refresh the page</Alert>;
	}

	return (
		<PlayerContext.Provider value={{
			currentTrackId: currentlyPlayingTrack,
			setCurrentTrackId: setCurrentTrackId,
			tracksList: currentTracks,
			getCurrentTrackFromId: getCurrentTrackFromId
		}}>
			{children}
		</PlayerContext.Provider>
	);
}
