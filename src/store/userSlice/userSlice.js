import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        jwt: '',
        info: {},
        imgId: null,
        avatar: null,
    },
    isLoading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.user = action.payload
        },
        addImgId: (state, action) => {
            state.user.imgId = action.payload
        },
        addUserInfo: (state, action) => {
            state.user.user = action.payload
        },

        avatarStore: (state, action) => {
            state.user.avatar = action.payload
        },
        removeUser: (state) => {
            state.user = null
        },

    },
})

// Action creators are generated for each case reducer function
export const { registerUser, removeUser, addImgId, avatarStore, addUserInfo } = userSlice.actions

export default userSlice.reducer