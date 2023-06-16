import { PlaylistsModel } from "@/models/playlists-model";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type UserPlaylistsContextType = {
	userPlaylists: PlaylistsModel
	setUserPlaylists: Dispatch<SetStateAction<PlaylistsModel>>
};

export const UserPlaylistsContext = createContext<UserPlaylistsContextType>({} as UserPlaylistsContextType);

export function UserPlaylistsContextProvider({ children, serverSideUserPlaylists }: { children: ReactNode, serverSideUserPlaylists: PlaylistsModel }) {
	const [userPlaylists, setUserPlaylists] = useState<PlaylistsModel>(serverSideUserPlaylists);

	return (
		<UserPlaylistsContext.Provider value={{ userPlaylists, setUserPlaylists }}>
			{children}
		</UserPlaylistsContext.Provider>
	);
}