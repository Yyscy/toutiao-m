import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体图标
import '@/assets/iconfont/iconfont.css'
// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态加载rem单位
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
