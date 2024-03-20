import { configureStore } from "@reduxjs/toolkit";

//Slices imported 
import createProductSlice from "./slices/createProduct.slice";
import deletedProductSlice from "./slices/deletedProduct.slice";

export default configureStore({
    reducer: {
        createProductSlice,
        deletedProductSlice
    }
})