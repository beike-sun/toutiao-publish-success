import request from '@/utlis/request.js'
// 获取筛选内容的请求
export const connent = (params) => {
  return request({
    method: 'get',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取频道的请求
export const ConnentChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
