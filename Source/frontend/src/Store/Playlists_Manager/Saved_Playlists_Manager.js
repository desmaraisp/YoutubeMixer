import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


export const Saved_Playlists_Slice = createSlice({
    name: "Saved_Playlists_Slice",
    initialState: { values: [] },
    reducers: {
        SavePlaylists: (state, action) => {
            state.values = action.payload;
        },
    },
});



export const { SavePlaylists } = Saved_Playlists_Slice.actions;


const persistConfig = {
    key: 'Saved_Playlists',
    version: 1,
    storage,
}

export default persistReducer(persistConfig, Saved_Playlists_Slice.reducer)