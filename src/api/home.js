import request from '@/utils/request'
// 频道列表
export const gitMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
