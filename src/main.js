import Vue from 'vue'
import App from './App.vue'
// 导入路由对象
import router from './router/index'
// 导入element ui
import ElementUI from 'element-ui';
// 导入 饿了么 的css
import 'element-ui/lib/theme-chalk/index.css';
// 注册 饿了么 ui
import './style/base.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
// window.console.log(process.env.VUE_APP_BASEURL)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
