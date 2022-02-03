import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

export const Player_Slice = createSlice({
    name: "Player",
    initialState: {
        Current_Index: 0,
        Videos: []
    },
    reducers: {
        setCurrentIndex: (state, action) => {
            state.Current_Index = action.payload;
        },

        setVideosList: (state, action) => {
            action.payload.forEach(function (part, index, Array) {
                Array[index].UUID = uuidv4()
            });

            state.Videos = action.payload
            state.Current_Index = 0
        }
    },
});

export const { setCurrentIndex, setVideosList } = Player_Slice.actions;

export default Player_Slice.reducer;