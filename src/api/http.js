import axios from 'axios'
import { base_url } from '@/common'
// 创建axios实例
const service = axios.create({
  baseURL: base_url, // api 的 base_url
  timeout: 300000 // 请求超时时间
})
// request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default service
