import { configureStore } from "@reduxjs/toolkit";

//Slices imported 
import userSlice from "./slices/user.slice";
import productSlice from "./slices/product.Slice";
import asignationSlice from "./slices/asignation.slice";

export default configureStore({
    reducer: {
        userSlice,
        productSlice,
        asignationSlice
    }
})