import axios from "axios";

export const axiosPoderJudicial = axios.create({
    baseURL: "https://192.168.1.105:4000/api/v1/"
})

export const getConfig = () => {
    return {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("authInfo"))?.token,
          }
    }
}