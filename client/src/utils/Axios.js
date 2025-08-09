import axios from 'axios';
import SummaryApi, { baseUrl } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})
// sender access token in the header
Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken")
        if (accessToken) {
            config.headers.authorization = `Bearer ${accessToken}`
        }
        return config
    },
    () => {
        return Promise.reject(error)
    }
)
// extend the life span of access token with the help refresh token
Axios.interceptors.request.use(
    (response) => {
        return response
    },
    async (error) => {
        let originRequest = error.config
        if (error.response.status === 401 && !originRequest.retry) {
           originRequest.retry = true
           const refreshToken = localStorage.getItem("refreshToken")
           if (refreshToken) {
               const newAccessToken = await refresAcceccToken(refreshToken)
               if(newAccessToken) {
                   originRequest.headers.authorization = `Bearer ${newAccessToken}`
                   return Axios(originRequest)
               }
           } 
        }
        return Promise.reject(error)
    }
)
// send to backend refresh token, and get new access token
// write the new access token to local storage and return
const refresAcceccToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers: {
                authorization: `Bearer ${refreshToken}`
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem("accessToken", accessToken)
        return accessToken
    } catch (error) {
        console.log(error);
    }
}

export default Axios