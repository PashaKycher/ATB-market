import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    _id: "",
    name: "",
    email: "",
    mobile: "",
    avatar: "",
    verify_email: "",
    last_login_date: new Date(),
    status: "",
    address_datails: [],
    shoping_cart: [],
    orderHistory: [],
    role:""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id;
            state.name = action.payload?.name;
            state.email = action.payload?.email;
            state.mobile = action.payload?.mobile;
            state.avatar = action.payload?.avatar;
            state.verify_email = action.payload?.verify_email;
            state.last_login_date = action.payload?.last_login_data;
            state.status = action.payload?.status;
            state.address_datails = action.payload?.address_datails;
            state.shoping_cart = action.payload?.shoping_cart;
            state.orderHistory = action.payload?.orderHistory;
            state.role = action.payload?.role;
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload
        },
        logout : (state, action) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.mobile = "";
            state.avatar = "";
            state.verify_email = "";
            state.last_login_date = new Date();
            state.status = "";
            state.address_datails = [];
            state.shoping_cart = [];
            state.orderHistory = [];
            state.role = "";
        }
    }
})

export const { setUserDetails, updateAvatar, logout } = userSlice.actions

export default userSlice.reducer