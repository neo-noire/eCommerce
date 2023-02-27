import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserToken: (state, action) => {
            state.user = action.payload
            console.log(state.user.jwt)
        },
        addInfo: (state, action) => {
            state.user.user = action.payload
        },
        removeUser: (state) => {
            state.user = undefined
        },

    },
})

// Action creators are generated for each case reducer function
export const { addUserToken, removeUser, addInfo } = userSlice.actions

export default userSlice.reducer