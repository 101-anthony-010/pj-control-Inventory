import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateProduct: false,
  isShowUpdatedProduct: false,
}

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    changeIsShowCreateProduct: (state) => {
      state.isShowCreateProduct = !state.isShowCreateProduct
    },
    changeIsShowUpdatedProduct: (state) => {
      state.isShowUpdatedProduct = !state.isShowUpdatedProduct
    }
  }
})
export const {
    changeIsShowCreateProduct
} = productSlice.actions

export default productSlice.reducer