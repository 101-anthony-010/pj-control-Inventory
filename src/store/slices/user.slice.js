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
    setUser
} = userSlice.actions

export default userSlice.reducer