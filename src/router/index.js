import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)
// 路由页面的懒加载
//  - 需要哪个页面, 再去请求那个页面
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/My',
    children: [
      {
        path: '/Home',
        component: () => import('@/views/Home')
      },
      {
        path: '/My',
        component: () => import('@/views/My')
      },
      {
        path: '/QA',
        component: () => import('@/views/QA')
      },
      {
        path: '/Video',
        component: () => import('@/views/Video')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/Login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
