import request from '@/utlis/request.js'
// 获取粉丝列表请求
export const getFansList = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
