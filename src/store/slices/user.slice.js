import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateUser: false,
  isShowUpdatedUser: false,
  isShowInfoUser: false,
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
    },
    changeIsShowInfoUser: (state) => {
      state.isShowInfoUser = !state.isShowInfoUser
    },
    setUser: (state, action) => {
      const newState = { ...state, ...action.payload }
      localStorage.setItem('userInfo', JSON.stringify(newState))
      return newState
    }
  }
})
export const {
    changeIsShowCreateUser,
    changeIsShowUpdatedUser,
    changeIsShowInfoUser,
    setUser
} = userSlice.actions

export default userSlice.reducer