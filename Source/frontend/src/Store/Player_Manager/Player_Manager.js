import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createMigrate } from 'redux-persist'
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
            let ResultArray = []

            action.payload.forEach(function (part, index, Array) {
                ResultArray = ResultArray.concat(
                    {
                        VideoID : part.VideoID,
                        Title : part.Title,
                        UUID : uuidv4()
                    }
                ) 
            });

            state.Videos = action.payload
            state.Current_Index = 0
        }
    },
});

export const { setCurrentIndex, setVideosList } = Player_Slice.actions;

const migrations = {
    1: (state) => {
        return state
    },

/*     0: (state) => {
        let state2 = {
            Current_Index : state.Current_Index,
            Videos : [
                'test'
            ]
		}

        for (const [key, value] of Object.entries(state)) {
            state[key] = undefined
        }
        for (const [key, value] of Object.entries(state2)) {
            state[key] = value
        }

        return state
    }, */


}

const persistConfig = {
    key: 'Player',
    version: 1,
    storage,
    migrate: createMigrate(migrations, { debug: false }),
}

export default persistReducer(persistConfig, Player_Slice.reducer)