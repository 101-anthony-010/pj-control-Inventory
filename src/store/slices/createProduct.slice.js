import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateProduct: false
}

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    changeIsShowCreateProduct: (state) => {
      state.isShowCreateProduct = !state.isShowCreateProduct
    }
  }
})
export const {
    changeIsShowCreateProduct
} = createProductSlice.actions

export default createProductSlice.reducer