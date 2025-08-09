import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    orderList: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState: initialValue,
    reducers: {
        setOrder: (state, action) => {
            state.orderList = [...action.payload];
        },
    },
});

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer