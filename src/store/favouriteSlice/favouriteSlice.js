import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favourite: []
}

export const favSlice = createSlice({
    name: 'favourite',
    initialState,
    reducers: {
        addToFav: (state, action) => {
             state.favourite.push(action.payload)
        },
        deleteFromFav: (state, action) => {
            state.favourite = state.favourite.filter(el => el.id !== action.payload)
        },
        resetFavourite: (state) => {
            state.favourite = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToFav, resetFavourite, deleteFromFav } = favSlice.actions

export default favSlice.reducer