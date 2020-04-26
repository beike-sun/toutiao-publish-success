// 基于axios分装的请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
// 创建一个axios实例request.相当于复制了一个axios.通过这个实例发请求
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 处理后端返回的未经处理的JSON格式字符串的原始数据-data
  transformResponse: [function (data) {
    // 后端返回的数据可能不是json格式字符串，如果不是，那么使用jsonbig.parse调用就会报错。
    // 所以使用try-catch来捕获异常，处理异常的发生
    try {
      // axios 默认在内部使用 JSON.parse 来转换处理原始数据
      // 如果转换成功，则将结果直接返回
      // 这个包会把js超出安全整数的数据转成一种bigNumber的类型，使用的时候需要把bigNumber.toString(),就能得到原来正确的数据了
      return JSONbig.parse(data)
    } catch (err) {
      // 如果转换失败，则将后台返回的数据原样响应返回
      return data
    }
  }]
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
