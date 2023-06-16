import { PlayerModel } from "@/models/player-model";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type PlayerContextType = {
	playerState: PlayerModel
	setPlayerState: Dispatch<SetStateAction<PlayerModel>>
};

export const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

export function PlayerContextProvider({ children, serverSidePlayerState }: { children: ReactNode, serverSidePlayerState: PlayerModel }) {
	const [playerState, setPlayerState] = useState<PlayerModel>(serverSidePlayerState);

	return (
		<PlayerContext.Provider value={{ playerState, setPlayerState }}>
			{children}
		</PlayerContext.Provider>
	);
}