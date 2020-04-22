// 用户相关请求模块
import request from '@/utlis/request'
export const userlogin = (data) => {
  return request({
    method: 'post',
    url: 'mp/v1_0/authorizations',
    data
  })
}
// 获取用户相关信息
// const user= JSON.parse(window.localStorage.getItem('user'))
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
