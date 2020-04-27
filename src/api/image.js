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
