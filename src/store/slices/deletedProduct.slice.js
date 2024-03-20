import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowDeletedProduct: false
}

const deletedProductSlice = createSlice({
  name: "deletedProduct",
  initialState,
  reducers: {
    changeIsShowDeletedProduct: (state) => {
      state.isShowDeletedProduct = !state.isShowDeletedProduct
    }
  }
})
export const {
    changeIsShowDeletedProduct
} = deletedProductSlice.actions

export default deletedProductSlice.reducer