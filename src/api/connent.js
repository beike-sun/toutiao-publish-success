import request from '@/utlis/request.js'
// 获取(筛选)文章内容的请求
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
export const deleteConnent = (connentId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${connentId}`
  })
}
// 发表文章的请求
export const addPublishConnent = (data, draft = false) => {
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
export const getEditConnent = (connentId) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${connentId}`
  })
}
// 更新文章内容的请求
export const updataConnent = (connentId, data, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${connentId}`,
    params: {
      draft
    },
    data
  })
}
// 修改文章评论状态的请求
export const updataCommentStatus = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
