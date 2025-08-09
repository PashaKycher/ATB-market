import { configureStore } from '@reduxjs/toolkit'
import userReduser from './userSlice.js'
import productReduser from './productSlice.js'
import cartReduser from './cartProductSlice.js'
import addressReduser from './addressSlice.js'
import orderReduser from './orderSlice.js'

export const store = configureStore({
  reducer: {
    user: userReduser,
    product: productReduser,
    cartItem: cartReduser,
    address: addressReduser,
    order: orderReduser
  },
  // need for debug error 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})