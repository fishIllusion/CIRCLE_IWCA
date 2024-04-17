import axios from "axios";

const JSON = 'application/json; charset=utf-8';

// function request(postParameter) {
//      let axiosInstance = axios.create({
//           baseURL: '/api',
//           headers: {
//                'Content-Type': postParameter?postParameter:JSON
//           },
//           timeout: 2000
//      })

//      axiosInstance.interceptors.request.use(config => {
//           if(localStorage.token) {
//                config.headers['Authorization'] = localStorage.token
//           }
//             return config
//      })

//      axiosInstance.interceptors.response.use(res => {
//           return res.data
//      }, err => {
//      }) 

//      return axiosInstance
// }

// const app = (postParameter, url, method) => {
//      let axiosInstance = axios.create({
//           baseURL: '/api',
//           url,
//           method,
//           headers: {
//                'Content-Type': postParameter?postParameter:JSON
//           },
//           timeout: 2000
//      })

//      axiosInstance.interceptors.request.use(config => {
//           if(localStorage.token) {
//                config.headers['Authorization'] = localStorage.token
//           }
//           return config
//      })

//      axiosInstance.interceptors.response.use(res => {
//           return res.data
//      }, err => {
//      }) 

//      return axiosInstance
// }
// const app = request(url, method)

let axiosInstance = axios.create({
     baseURL: '/api',
     headers: {
          'Content-Type': JSON
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