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
