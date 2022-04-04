import Unsaved_Playlists_reducer from './Playlists_Manager/Unsaved_Playlists_Manager'
import Player_reducer from './Player_Manager/Player_Manager'
import Saved_Playlists_reducer from './Playlists_Manager/Saved_Playlists_Manager'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist'
import { configureStore, combineReducers } from '@reduxjs/toolkit'



const rootReducer = combineReducers({
    Unsaved_Playlists_reducer: Unsaved_Playlists_reducer,
    Player_reducer: Player_reducer,
    Saved_Playlists_reducer: Saved_Playlists_reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
