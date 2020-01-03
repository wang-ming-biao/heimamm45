// 导入vue
import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
// 导入子组件
import index from '../views/index/index.vue'
import login from '../views/login/login.vue'

// 注册Vue.use
Vue.use(VueRouter)
// 实例化router
const router = new VueRouter({
    routes:[
        {
            path:'/index',
            component:index
        },
        {
            path:"/login",
            component:login
        },
    ]
});
export default router
