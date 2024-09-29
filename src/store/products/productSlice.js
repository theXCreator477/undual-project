import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: true,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addProducts: (state, action) => {
            console.log(action.payload)
            state.products = [...state.products, ...action.payload]
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setProducts, addProducts, setLoading } = productSlice.actions

export default productSlice.reducer