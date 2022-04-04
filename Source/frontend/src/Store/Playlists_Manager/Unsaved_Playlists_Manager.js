import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const Unsaved_Playlists_Slice = createSlice({
    name: "Unsaved_Playlists_Slice",
    initialState: { values: []},
    reducers : {
        Add_Playlist_To_Unsaved_Playlists: (state, action) => {
            if (action.payload !== '') {
                let payload = action.payload
                payload = payload.replace('https://www.youtube.com/playlist?list=','')
                
                const payload_dict = { PlaylistID: payload, UUID: uuidv4() }
                state.values = state.values.concat(payload_dict);
            }
        },

        Remove_nth_Playlist_From_Unsaved_Playlists: (state, action) => {

            let SplicedArray = [...state.values];
            SplicedArray.splice(action.payload, 1);

            state.values = SplicedArray;
        },

        Set_Unsaved_Playlists_Value: (state, action) => {
            state.values = action.payload
        }
    },
});

export const { Add_Playlist_To_Unsaved_Playlists, Remove_nth_Playlist_From_Unsaved_Playlists, Set_Unsaved_Playlists_Value } = Unsaved_Playlists_Slice.actions;

export default Unsaved_Playlists_Slice.reducer;