import request from '@/utils/request'
// 用户个人信息
export const myMessage = () => {
  return request({
    url: '/v1_0/user'
  })
}
// 粉丝列表
export const Fanlist = () => {
  return request({
    url: '/v1_0/user/followers'
  })
}
// 关注列表
export const watchlist = () => {
  return request({
    url: '/v1_0/user/followings'
  })
}
/**
 * 关注用户
* @param { String } target
@returns Promise
*/
export const Focusontheuser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: { target }
  })
}
/**
 * 取消关注用户
* @param { String } id
@returns Promise
*/
export const unfollow = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
/**
 * 取消关注用户
* @param { String } id
@returns Promise
*/
export const personaldetails = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑信息
* @param { String } name 昵称
* @param { String } gender 性别 0男1女
* @param { String } birthday 生日 “20018-10-1”
* @param { String } realName 真实姓名
* @param { String } intro 个人介绍
@returns Promise
*/
export const EditYourInformation = (value) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data: value
  })
}
/**
 * 编辑头像
* @param { file } photo 头像
@returns Promise
*/
export const uploadPhoto = (photo) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo
  })
}
