import { createSlice } from '@reduxjs/toolkit'

export const Player_Slice = createSlice({
    name: "Player",
    initialState: {
        Current_Index: 0,
        Videos: [
            { Title: "titletest", VideoID: "2g811Eo7K8U" },
            { Title: "titletest2", VideoID: "0hjp-Ey5TZ0" }
        ]
    },
    reducers: {
        setCurrentIndex: (state, action) => {
            state.Current_Index = action.payload;
        },

        setVideosList: (state, action) => {
            state.Videos = action.payload
            state.Current_Index = 0
        }
    },
});

export const { setCurrentIndex, setVideosList } = Player_Slice.actions;

export default Player_Slice.reducer;