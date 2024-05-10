import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowCreateUser: false,
  isShowUpdatedUser: false,
  isShowInfoUser: false,
  isShowInfoUserUpdated: false,
  isShowDeleteUser: false,
  isShowCreateSede: false,
  isShowUpdatedSede: false,
  isShowCreateModel: false,
  isShowUpdatedModel: false,
  isShowCreateMarca: false,
  isShowUpdatedMarca: false,
  isShowCreateCargo: false,
  isShowUpdatedCargo: false,
  isShowCreateDependencia: false,
  isShowUpdatedDependencia: false,
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    changeIsShowCreateUser: (state) => { state.isShowCreateUser = !state.isShowCreateUser },
    changeIsShowUpdatedUser: (state) => { state.isShowUpdatedUser = !state.isShowUpdatedUser },
    changeIsShowInfoUser: (state) => { state.isShowInfoUser = !state.isShowInfoUser },
    changeIsShowInfoUserUpdated: (state) => { state.isShowInfoUserUpdated = !state.isShowInfoUserUpdated },
    changeIsShowDeleteUser: (state) => { state.isShowDeleteUser = !state.isShowDeleteUser },
    changeIsShowCreateSede: (state) => { state.isShowCreateSede = !state.isShowCreateSede },
    changeIsShowUpdatedSede: (state) => { state.isShowUpdatedSede = !state.isShowUpdatedSede },
    changeIsShowCreateModel: (state) => { state.isShowCreateModel = !state.isShowCreateModel },
    changeIsShowUpdatedModel: (state) => { state.isShowUpdatedModel = !state.isShowUpdatedModel },
    changeIsShowCreateMarca: (state) => { state.isShowCreateMarca = !state.isShowCreateMarca },
    changeIsShowUpdatedMarca: (state) => { state.isShowUpdatedMarca = !state.isShowUpdatedMarca },
    changeIsShowCreateCargo: (state) => { state.isShowCreateCargo = !state.isShowCreateCargo },
    changeIsShowUpdatedCargo: (state) => { state.isShowUpdatedCargo = !state.isShowUpdatedCargo },
    changeIsShowCreateDependencia: (state) => { state.isShowCreateDependencia = !state.isShowCreateDependencia },
    changeIsShowUpdatedDependencia: (state) => { state.isShowUpdatedDependencia = !state.isShowUpdatedDependencia },
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
    changeIsShowInfoUserUpdated,
    changeIsShowDeleteUser,
    changeIsShowCreateSede,
    changeIsShowUpdatedSede,
    changeIsShowCreateModel,
    changeIsShowUpdatedModel,
    changeIsShowCreateMarca,
    changeIsShowUpdatedMarca,
    changeIsShowCreateCargo,
    changeIsShowUpdatedCargo,
    changeIsShowCreateDependencia,
    changeIsShowUpdatedDependencia,
    setUser
} = userSlice.actions

export default userSlice.reducer