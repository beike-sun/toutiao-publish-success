import request from '@/utlis/request.js'
// 图片上传请求
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传的接口要求将请求头中的Content-type设置为multipart/form-data,
    // 但是我们使用axios上传的话不需要手动设置，只要给data一个FormData对象即可。
    data
  })
}
// 获取图片素材请求
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
// 取消收藏图片素材请求
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
// 删除图片素材的请求
export const deleteImage = deleteImgId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${deleteImgId}`
  })
}
