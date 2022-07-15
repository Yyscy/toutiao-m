export const Mobiles = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[1-9]\d{9}$/, message: '手机号格式不正确' }
]

export const seccode = [
  { required: true, message: '请输入验证码' },
  { pattern: /[0-9]{6}/, message: '请输入六位验证码' }
]
