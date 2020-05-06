import request from '@/utlis/request.js'
export const getDiscussList = params => {
    return request({
        method: 'GET',
        url:'/mp/v1_0/articles',
        params
    })
}
// 修改文章评论状态
export const updataStatus = (atricalId,data) => {
    return request({
        method: 'PUT',
        url:'/mp/v1_0/comments/status',
        params: {
            article_id: atricalId
        },
        data
    })
}
