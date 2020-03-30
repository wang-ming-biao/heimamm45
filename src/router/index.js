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

// 导入封装的token获取方法
import { getToken, removeToken } from '@/utils/token.js'
// 导入请求用户数据的方法
import { info } from '@/api/login.js'
// 按需导入 message弹框
import { Message } from 'element-ui'
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
                    path:'/',
                    component:user
                },
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
// 添加有个导航白名单
const whitePaths = [ '/login' ]
// 注册导航守卫
router.beforeEach((to, from, next) => {
    // 如果当前去的是登录页面,直接放行
    if ( whitePaths.includes(to.path.toLocaleLowerCase()) ) {
        // 如果白名单中包含要去的页面的路径,那么就放行
        next()
    } else {
    // 获取到用户的存储在本地的token
    const token = getToken()
    if(token === null) {
        // 使用按需导入的Message弹框
    Message.warning('没有登陆哦!请先登录')
    next('/login')
    } else {
        // 如果token存在,那么就放过去
        // 先判断用户的token是否是伪造的
        info().then(res=>{
            // 在请求数据之前,先判断用户的token是否还有效
            if (res.data.code === 206) {
              // 证明用户的token有误,需要重新登录
              Message.warning('登录已过期,请重新登录!')
              // 删除本地用户错误或已过期的token
              removeToken()
              next('/login')
            }
            // 保存数据
            //   this.user = res.data.data
              // 头像没有基地址,自己进行拼接
            //   this.user.avatar = process.env.VUE_APP_BASEURL + '/' + this.user.avatar
          })
    }
    }
  })
// 将路由暴露出去
export default router
