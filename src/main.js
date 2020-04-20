import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入一个第三方组件库
import ElementUI from 'element-ui'
// 导入第三方组件库中的样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
