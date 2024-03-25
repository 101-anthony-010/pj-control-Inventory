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
    },
    setProduct: (state, action) => {
      const newState = { ...state, ...action.payload }
      localStorage.setItem('porductInfo', JSON.stringify(newState))
      return newState
    }
  }
})
export const {
    changeIsShowCreateProduct,
    changeIsShowUpdatedProduct,
    setProduct,
} = productSlice.actions

export default productSlice.reducer