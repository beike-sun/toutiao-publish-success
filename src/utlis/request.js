// 基于axios分装的请求模块
import axios from 'axios'
// 创建一个axios实例request.相当于复制了一个axios.通过这个实例发请求
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
// 请求拦截器
// 拦截判断用户是否带有令牌,统一处理
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
