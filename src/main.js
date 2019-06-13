import Vue from 'vue'
import App from './App.vue'
import router from './routers/router'
import store from './vuex/store'
import '@/assets/css/reset.css' // 重置浏览器样式

Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
  if (to.meta.title) { //  如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
   /* 解决首次进入，回退白屏问题 */
  if (from.fullPath === '/getRed/index' && to.fullPath !== '/getRed/successRed' && to.fullPath !== '/getRed/failRed') {
   //执行某些操作
  }
  /* 路由发生变化修改页面title */
  if (to.matched.some(record => record.meta.requiresAuth)) {
    window.console.log(to.meta)
    next()
  } else {
    next()
  }

})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
