import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    isOpen: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            const item = state.cart.find(el => el.id === action.payload.id)
            item
                ? item.quantity += action.payload.quantity
                : state.cart.push(action.payload)
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(el => el.id !== action.payload)
        },
        resetCart: (state) => {
            state.cart = []
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { add, resetCart, deleteItem, openCart, closeCart } = cartSlice.actions

export default cartSlice.reducer