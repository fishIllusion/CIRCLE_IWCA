import axios from "axios";

let axiosInstance = axios.create({
     baseURL: '/binary',
     headers: {
          'Content-Type': 'multipart/form-data'
     },
     timeout: 1000
})

axiosInstance.interceptors.request.use(config => {
     if(localStorage.token) {
          config.headers['Authorization'] = localStorage.token
     }
     return config
})

axiosInstance.interceptors.response.use(res => {
     return res.data
}, err => {
     return err
}) 

export default axiosInstance