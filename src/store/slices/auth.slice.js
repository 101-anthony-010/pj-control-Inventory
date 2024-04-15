import { createSlice } from "@reduxjs/toolkit";
import { axiosPoderJudicial } from "../../utils/configAxios";
import axios from "axios";

const initialState = {
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: "authSlice",
  initialState: JSON.parse(localStorage.getItem("authInfo")) ?? initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      const newState = {...state, ...action.payload}
      localStorage.setItem("authInfo", JSON.stringify(newState))
      return newState
  },
  logOut: (state) => {
      const newState = {...state, ...initialState}
      localStorage.setItem("authInfo", JSON.stringify(newState))
      return newState
  },
  }
})
export const { 
  setAuthInfo, 
  logOut,
} = authSlice.actions

export const loginAuth = (data) => (dispacth) => {
  axiosPoderJudicial.post("/auth/login", data)
    .then((res) => dispacth(setAuthInfo(res.data)))
    .catch((err) => console.log(err))
}


export default authSlice.reducer