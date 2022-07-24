import request from '@/utils/request'
/**
 * 获取文章新闻推荐
* @param { 频道id } channelId
@param { 时间戳} timestamp
@returns Promise
*/
export const gitArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
/**
 * 获取新闻详情
* @param { String } articleid
@returns Promise
*/
export const gitNewsdetails = (articleid) => {
  return request({
    url: `/v1_0/articles/${articleid}`
  })
}

/**
 * 收藏
* @param { String } target 目标id
@returns Promise
*/
export const hoarding = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: { target }
  })
}

/**
 * 取消收藏
* @param { String } target 目标id
@returns Promise
*/
export const cancelhoarding = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 * 取消不喜欢
* @param { String } target 目标id
@returns Promise
*/
export const dislike = (target) => {
  return request({
    url: `/v1_0/article/dislikes/${target}`,
    method: 'DELETE'
  })
}

/**
 * 点赞
* @param { String } target 目标id
@returns Promise
*/
export const postgivealike = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: { target }
  })
}

/**
 * 取消点赞
* @param { String } target 目标id
@returns Promise
*/
export const cancelgivealike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
