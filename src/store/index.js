import { configureStore } from "@reduxjs/toolkit";

//Slices imported 
import userSlice from "./slices/user.slice";
import productSlice from "./slices/product.Slice";

export default configureStore({
    reducer: {
        userSlice,
        productSlice
    }
})