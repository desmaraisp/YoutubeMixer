import { createSlice } from '@reduxjs/toolkit'

export const Playlists_Slice = createSlice({
    name: "Playlists_Slice",
    initialState: { values: []},
    reducers : {
        addPlaylist: (state, action) => {
            if (action.payload.Name !== '') {
                state.values = state.values.concat(action.payload);
            }
        },

        remove_Nth_Playlist: (state, action) => {

            let SplicedArray = [...state.values];
            SplicedArray.splice(action.payload, 1);

            state.values = SplicedArray;
        },

        Set_Playlist_Menu_Value: (state, action) => {
            state.values = action.payload
        }
    },
});

export const { addPlaylist, remove_Nth_Playlist, Set_Playlist_Menu_Value } = Playlists_Slice.actions;

export default Playlists_Slice.reducer;