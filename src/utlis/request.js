// 基于axios分装的请求模块
import axios from 'axios'
// 创建一个axios实例request.相当于复制了一个axios.通过这个实例发请求
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
