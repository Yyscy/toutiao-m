// 引入axios
import axios from 'axios'
import store from '@/store'
// 配置axios的默认配置
//  - 创建一个全新的axios的对象, 克隆
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default request
