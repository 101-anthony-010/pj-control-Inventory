import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateUser: false,
  isShowUpdatedUser: false,
  isShowInfoUser: false,
  isShowSede: false,
  isShowDeleteUser: false,
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
    changeIsShowSede: (state) => {
      state.isShowSede = !state.isShowSede
    },
    changeIsShowDeleteUser: (state) => {
      state.isShowDeleteUser = !state.isShowDeleteUser
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
    changeIsShowSede,
    changeIsShowDeleteUser,
    setUser
} = userSlice.actions

export default userSlice.reducer