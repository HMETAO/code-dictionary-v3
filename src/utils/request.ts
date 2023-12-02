import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import {errorMessage} from "./baseMessage";
import {Result} from "@/result";
// create an axios instance
const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 600 * 1000, // request timeout
    withCredentials: true
})

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // do something before request is sent
        if (localStorage.getItem("token"))
            config.headers['code-dictionary'] = localStorage.getItem("token")
        return config
    },
    (err: AxiosError) => {
        // do something with request error
        console.error(err) // for debug
        errorMessage(err.message)
        return Promise.reject(err)
    }
)
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response: AxiosResponse) => {
        if (response.data instanceof Blob) {
            return {data: response.data, headers: response.headers}
        }
        return {...response.data, headers: response.headers}
    },
    (err: AxiosError) => {
        console.error(err) // for debug
        const response = err.response as AxiosResponse<Result>
        // 错误消息提示
        errorMessage(response.data.message)
        if (!window.navigator.onLine) {
            errorMessage('网络连接失败');
        }
        return Promise.reject(response.data)
    }
)


export default service
