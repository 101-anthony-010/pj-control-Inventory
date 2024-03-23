import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateUser: false,
  isShowUpdatedUser: false,
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    changeIsShowCreateUser: (state) => {
      state.isShowCreateUser = !state.isShowCreateUser
    },
    changeIsShowUpdatedUser: (state) => {
      state.isShowUpdatedUser = !state.isShowUpdatedUser
    }
  }
})
export const {
    changeIsShowCreateUser
} = userSlice.actions

export default userSlice.reducer