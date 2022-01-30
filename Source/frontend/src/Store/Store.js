import Playlist_reducer from './Playlist_Manager/Playlist_Manager'
import Player_reducer from './Player_Manager/Player_Manager'
import Saved_Playlists_reducer from './Playlist_Manager/Saved_Playlists_Manager'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    playlists_reducer: Playlist_reducer,
    player_reducer: Player_reducer,
    saved_playlists_reducer: Saved_Playlists_reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
