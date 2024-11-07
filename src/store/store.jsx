import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../Reducers/productReducer";


const rootReducers = combineReducers({
    product: productReducer
})

const store = configureStore({
    reducer: rootReducers
})

export { store };