// 导入vue
import Vue from 'vue'
// 导入router
import VueRouter from 'vue-router'
// 导入子组件
import index from '../views/index/index.vue'
import login from '../views/login/login.vue'
// 导入嵌套页面
import user from '../views/index/user/user.vue'
import enterprise from '../views/index/enterprise/enterprise.vue'
import question from '../views/index/question/question.vue'
import subject from '../views/index/subject/subject.vue'
import chart from '../views/index/chart/chart.vue'

// 注册Vue.use
Vue.use(VueRouter)
// 实例化router
const router = new VueRouter({
    routes:[
        {
            path:'/index',
            component:index,
            children:[
                {
                    path:'user',
                    component:user
                },
                {
                    path:'enterprise',
                    component:enterprise
                },
                {
                    path:'question',
                    component:question
                },
                {
                    path:'subject',
                    component:subject
                },
                {
                    path:'chart',
                    component:chart
                },
            ]
        },
        {
            path:"/login",
            component:login
        },
        {
            path:"/",
            component:login
        },
    ]
});
export default router
