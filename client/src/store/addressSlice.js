import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    addressList: [],
};

const addressSlice = createSlice({
    name: "address",
    initialState: initialValue,
    reducers: {
        hendleAddAddressStore: (state, action) => {
            state.addressList = [...action.payload];
        }
    }
})

export const { hendleAddAddressStore } = addressSlice.actions;
export default addressSlice.reducer