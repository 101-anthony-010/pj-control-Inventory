import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateAsignation: false,
  isShowUpdatedAsignation: false,
}

const asignationSlice = createSlice({
  name: "asignationSlice",
  initialState,
  reducers: {
    changeIsShowCreateAsignation: (state) => {
      state.isShowCreateAsignation = !state.isShowCreateAsignation
    },
    changeIsShowUpdatedAsignation: (state) => {
      state.isShowUpdatedAsignation = !state.isShowUpdatedAsignation
    },
    setAsignation: (state, action) => {
      const newState = { ...state, ...action.payload }
      localStorage.setItem('asignationInfo', JSON.stringify(newState))
      return newState
    }
  }
})
export const {
    changeIsShowCreateAsignation,
    changeIsShowUpdatedAsignation,
    setAsignation,
} = asignationSlice.actions

export default asignationSlice.reducer