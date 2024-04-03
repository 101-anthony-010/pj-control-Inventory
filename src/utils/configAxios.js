import axios from "axios";

export const axiosPoderJudicial = axios.create({
    baseURL: "http://127.0.0.1:3000/api/v1/"
})


export const getConfig = () => {
    return {
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("userInfo"))?.token,
          }
    }
}