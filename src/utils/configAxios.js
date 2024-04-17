import axios from "axios";

export const axiosPoderJudicial = axios.create({
    baseURL: "http://localhost:3001/api/v1"
})

export const getConfig = () => {
    return {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("authInfo"))?.token,
          }
    }
}