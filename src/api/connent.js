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
// 删除文章的请求
export const deleteContent = (contentId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${contentId}`
  })
}
// 发表文章的请求
export const addPublishContent = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}
// 获取编辑文章的请求
export const getEditContent = (connentId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${connentId}`
  })
}
// 更新文章内容的请求
export const updataContent = (contentId, data, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${contentId}`,
    params: {
      draft
    },
    data
  })
}
