import { configureStore } from "@reduxjs/toolkit";

// import menuSlice from "./slices/menu.slice";
import createProductSlice from "./slices/createProduct.slice";

export default configureStore({
    reducer: {
        createProductSlice
    //   loginUserSlice
    }
})