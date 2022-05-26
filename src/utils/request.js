import axios from "axios";
import { Message } from 'element-ui';

const service = axios.create({
   baseURL: '/weather',
   timeout: 20000
});

service.interceptors.response.use(
    response => {
        const res = response.data
       if (res.code === 200 && res.msg) {
          Message({
             message: res.msg,
             type: 'success'
          })
       }
       if (res.code === 500) {
          Message({
             message: res.msg || '系统异常',
             type: 'error',
             duration: 5 * 1000
          })
          return Promise.reject(new Error(res.msg || 'Error'))
       } else {
          return res
       }
    },
    error => {
       console.log('err' + error) // for debug
       Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
       })
       return Promise.reject(error)
    }
)

export default service;
