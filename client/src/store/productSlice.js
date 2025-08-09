import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [],
    loadingCategory: false,
    subCategory: [],
    product: []
}

const productSlice = createSlice({
    name: "product",
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload];
        },
        setSubCategory: (state, action) => {
            state.subCategory = [...action.payload];
        },
        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload
        },
        setProduct: (state, action) => {
            state.product = [...action.payload];
        }
    }
})

export const { setAllCategory, setSubCategory, setProduct, setLoadingCategory } = productSlice.actions
export default productSlice.reducer