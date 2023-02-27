import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const item = state.cart.find(el => el.id === action.payload.id)
            item
                ? item.number += action.payload.number
                : state.cart.push(action.payload)
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(el => el.id !== action.payload)
        },
        resetCart: (state) => {
            state.cart = []
        }
    },
})

// Action creators are generated for each case reducer function
export const { add, resetCart, deleteItem } = cartSlice.actions

export default cartSlice.reducer