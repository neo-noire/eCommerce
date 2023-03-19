import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isOpen = true
        },
        closeMenu: (state) => {
            state.isOpen = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { openMenu, closeMenu } = menuSlice.actions

export default menuSlice.reducer