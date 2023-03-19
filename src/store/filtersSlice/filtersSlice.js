import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        openFilters: (state) => {
            state.isOpen = true
        },
        closeFilters: (state) => {
            state.isOpen = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { openFilters, closeFilters } = filterSlice.actions

export default filterSlice.reducer