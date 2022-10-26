import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlaylistModel } from '../models/playlist-model'
import { PlaylistsModel } from '@/models/local-state/playlists-model'
import { setPlaylists } from '@/lib/firestore/set-playlists'
import { User } from 'firebase/auth'


export const savePlaylistsToExternalStorage = createAsyncThunk(
	'playlists/savePlaylistsToExternalStorage',
	async ({user, newPlaylists}: {user: User, newPlaylists: PlaylistModel[]}) => {
		await setPlaylists(user, {playlists: newPlaylists})
	}
)



const initialState: PlaylistsModel = {
	playlists: [],
}

export const playlistsSlice = createSlice({
	name: "playlists",
	initialState: initialState,
	reducers: {
		savePlaylistsToRedux: (state, action: PayloadAction<PlaylistModel[]>) => {
			state.playlists = action.payload;
		},
	},
});



export const { savePlaylistsToRedux } = playlistsSlice.actions;

export default playlistsSlice.reducer