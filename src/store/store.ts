import { configureStore, combineReducers } from '@reduxjs/toolkit'
import playlistsReducer from './saved-playlists-reducer'
import playerReducer from './saved-tracks-reducer';


const rootReducer = combineReducers({
	playlistsReducer: playlistsReducer,
	playerReducer: playerReducer,

});
export type RootState = ReturnType<typeof rootReducer>



export const store = configureStore({
	reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch