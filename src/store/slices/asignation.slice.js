import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateAsignation: false,
  isShowUpdatedAsignation: false,
  isShowInfoAsignation: false,
  isShowAmountAsignation: false,
  isShowExportPdf: false
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
    changeIsShowInfoAsignation: (state) => {
      state.isShowInfoAsignation = !state.isShowInfoAsignation
    },
    changeIsShowAmountAsignation: (state) => {
      state.isShowAmountAsignation = !state.isShowAmountAsignation
    },
    changeIsShowExportPdf: (state) => {
      state.isShowExportPdf = !state.isShowExportPdf
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
    changeIsShowInfoAsignation,
    changeIsShowAmountAsignation,
    changeIsShowExportPdf,
    setAsignation,
} = asignationSlice.actions

export default asignationSlice.reducer