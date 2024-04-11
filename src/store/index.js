import { configureStore } from "@reduxjs/toolkit";

//Slices imported 
import userSlice from "./slices/user.slice";
import productSlice from "./slices/product.Slice";
import asignationSlice from "./slices/asignation.slice";
import authSlice from "./slices/auth.slice";

export default configureStore({
    reducer: {
        userSlice,
        productSlice,
        asignationSlice,
        authSlice
    }
})