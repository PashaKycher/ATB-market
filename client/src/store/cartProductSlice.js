import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cart : [],
};

const cartProductSlice = createSlice({
    name: "cartProduct",
    initialState: initialValue,
    reducers: {
        hendleAddToCartStore: (state, action) => {
            state.cart = [...action.payload];
        },
    }
})

export const { hendleAddToCartStore } = cartProductSlice.actions;
export default cartProductSlice.reducer