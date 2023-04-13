import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlaylistModel } from '../models/playlist-model'
import { PlayerModel } from '@/models/local-state/player-model'
import { DBPlayerModel } from '@/models/database/db-player-model';
import { User } from 'firebase/auth';
import { AppDispatch, RootState } from './store';
import { setPlayer } from '@/lib/firestore/set-player';
import { ShuffleArray } from '@/lib/shuffle-array';


export const setCurrentIndexToExternalStorage = createAsyncThunk<void, { user: User, newIndex: number }, { dispatch: AppDispatch, state: RootState }>(
	'player/setCurrentIndexToExternalStorage',
	async ({ user, newIndex }, thunkApi) => {
		const previousState = thunkApi.getState().playerReducer
		await setPlayer(user, { ...previousState, currentIndex: newIndex })
	}
)

export const incrementCurrentIndexToExternalStorage = createAsyncThunk<void, User, { dispatch: AppDispatch, state: RootState }>(
	'player/incrementCurrentIndexToExternalStorage',
	async (user, thunkApi) => {
		const nextState = {...thunkApi.getState().playerReducer}

		if (nextState.currentIndex === nextState.playlistItems.length - 1) {
			nextState.currentIndex = 0
		}
		else {
			nextState.currentIndex += 1
		}

		await setPlayer(user, nextState)
	}
)

export const decrementCurrentIndexToExternalStorage = createAsyncThunk<void, User, { dispatch: AppDispatch, state: RootState }>(
	'player/decrementCurrentIndexToExternalStorage',
	async (user, thunkApi) => {
		const nextState = {...thunkApi.getState().playerReducer}

		if (nextState.currentIndex === 0) {
			nextState.currentIndex = nextState.playlistItems.length - 1
		}
		else {
			nextState.currentIndex -= 1
		}

		await setPlayer(user, nextState)
	}
)

export const shuffleTracksToExternalStorage = createAsyncThunk<void, User, { dispatch: AppDispatch, state: RootState }>(
	'player/shuffleTracksToExternalStorage',
	async (user, thunkApi) => {
		const previousState = {...thunkApi.getState().playerReducer}

		await setPlayer(user, {
			currentIndex: 0,
			playlistItems: ShuffleArray([...previousState.playlistItems])
		})
	}
)


export const setTracksListToExternalStorage = createAsyncThunk(
	'player/setTracksListToExternalStorage',
	async ({ user, newTracks, shuffle }: { user: User, newTracks: PlaylistModel[], shuffle: boolean }) => {

		const playlistItems = newTracks.flatMap((playlist) => {
			return playlist.playlistItems
		})

		await setPlayer(user, {
			currentIndex: 0,
			playlistItems: shuffle? ShuffleArray(playlistItems) : playlistItems
		})
	}
)






const initialState: PlayerModel = {
	playlistItems: [],
	currentIndex: 0,
	previousPlayerIndex: null
}

export const playerSlice = createSlice({
	name: "player",
	initialState: initialState,
	reducers: {
		setPlayerStateToRedux: (state, action: PayloadAction<DBPlayerModel>) => {
			state.previousPlayerIndex = state.currentIndex
			state.currentIndex = action.payload.currentIndex

			state.playlistItems = action.payload.playlistItems
		},

	},
});



export const { setPlayerStateToRedux } = playerSlice.actions;

export default playerSlice.reducer