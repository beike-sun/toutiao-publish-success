// 用户相关请求模块
import request from '@/utlis/request'
export const userlogin = (data) => {
  return request({
    method: 'post',
    url: 'mp/v1_0/authorizations',
    data
  })
}
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MzM5MjksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.mMBh0c9ghj0XwWKXfe5eRrXWByBMHd_OWcpyDsLp4hg '
    }
  })
}
