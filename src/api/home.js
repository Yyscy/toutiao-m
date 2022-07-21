import request from '@/utils/request'
import storage from '@/utils/storage'
// 频道列表
export const gitMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 所有频道列表
export const gitAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 本地储存
export const setLocalchannel = (value) => storage.set('LOCAL_CHANNEL', value)
export const getLocalchannel = () => storage.get('LOCAL_CHANNEL')

/**
 * 删除用户频道
 * @param {string|Number} target 删除
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [
        {
          id,
          seq
        }
      ]
    }
  })
}
