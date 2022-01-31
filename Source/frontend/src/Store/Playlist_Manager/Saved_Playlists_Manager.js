import { createSlice } from '@reduxjs/toolkit'

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

export default Saved_Playlists_Slice.reducer;