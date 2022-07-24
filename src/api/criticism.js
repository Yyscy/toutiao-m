import request from '@/utils/request'

/**
 * 获取评论或回复
 * @param {string} type 必须  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {string}  source 必须 source 文章id或评论id
 * @param {string}  offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 * @param {string}  limit 获取的评论数据个数，不传默认10
 * @returns Promise
 */
export const getcomments = (type, source, offset = null, limit = 10) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
/**
 * 关注用户
* @param { String } target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
* @param { String } content 评论内容
* @param { String } art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参
@returns Promise
*/
export const Postacomment = (target, content, id = null) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: { target, content, art_id: id }
  })
}
