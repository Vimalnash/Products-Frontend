import { createSlice } from "@reduxjs/toolkit";

const productSchema = {
    productArr : [],
    totalProducts: 0,
    productCategories : [],
    searchedProdArr : []
};

const productSlice = createSlice({
    name: "product",
    initialState: productSchema,
    reducers: {
        setProducts: (state, action) => {
            // console.log("Action", action)
            state.productArr = action.payload.productArr
        },
        setTotalProductCount: (state, action) => {
            // console.log("Action", action)
            state.totalProducts = action.payload.totalProducts
        },
        setProductCategory: (state, action) => {
            // console.log("Action", action)
            state.productCategories = action.payload.productCategories
        },
        setSearchedProductArr: (state, action) => {
            // console.log("Action", action)
            state.searchedProdArr = action.payload.searchedProdArr
        }
    }
})

export const { setProducts, setProductCategory, setTotalProductCount, setSearchProduct, setSearchedProductArr } = productSlice.actions;
export default productSlice.reducer;