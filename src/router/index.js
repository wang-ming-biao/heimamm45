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
import store from '../store'
// 注册Vue.use
Vue.use(VueRouter)
// 实例化router
const router = new VueRouter({
    routes: [
        {
            path: '/index',
            component: index,
            // 创建一个路由元信息,以此为依据,判断用户是否可以进入该页面
            meta: {
                roles: [ "超级管理员","管理员", "老师", "学生" ]
            },
            children: [
                {
                    path: '/',
                    component: subject,
                    meta: {
                        roles: [ "超级管理员","管理员", "老师", "学生" ]
                    }
                },
                {
                    path: 'user',
                    component: user,
                    meta: {
                        roles: [ "超级管理员","管理员"]
                    }
                },
                {
                    path: 'enterprise',
                    component: enterprise,
                    meta: {
                        roles: [ "超级管理员","管理员", "老师"]
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        roles: [ "超级管理员","管理员", "老师" ]
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: {
                        roles: [ "超级管理员","管理员", "老师", "学生" ]
                    }
                },
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        roles: [ "超级管理员","管理员", "老师", "学生" ]
                    }
                },
            ]
        },
        {
            path: "/login",
            component: login,
            meta: {
                roles: [ "超级管理员","管理员", "老师", "学生" ]
            }
        },
        {
            path: "/",
            component: login,
            meta: {
                roles: [ "超级管理员","管理员", "老师", "学生" ]
            }
        },
    ]
});
// 添加有个导航白名单
const whitePaths = ['/login']
// 注册导航守卫
router.beforeEach((to, from, next) => {
    // 如果当前去的是登录页面,直接放行
    if (whitePaths.includes(to.path.toLocaleLowerCase())) {
        // 如果白名单中包含要去的页面的路径,那么就放行
        next()
    } else {
        // 获取到用户的存储在本地的token
        const token = getToken()
        if (token === null) {
            // 使用按需导入的Message弹框
            Message.warning('没有登陆哦!请先登录')
            next('/login')
        } else {
            // 如果token存在,那么就放过去
            // 先判断用户的token是否是伪造的
            info().then(res => {
                // 在请求数据之前,先判断用户的token是否还有效
                if (res.data.code === 206) {
                    // 证明用户的token有误,需要重新登录
                    Message.warning('登录已过期,请重新登录!')
                    // 删除本地用户错误或已过期的token
                    removeToken()
                    next('/login')
                } else {
                    // 判断用户的状态,若等于0就是禁用状态
                    if (res.data.data.status === 0) {
                        Message.warning('你当前是禁用状态,请联系管理员将你启用')
                        next('/login')
                    } else {
                        // 否则的话就是启用状态
                        // 保存数据
                        store.state.user = res.data.data
                        // 头像没有基地址,自己进行拼接
                        store.state.user.avatar = process.env.VUE_APP_BASEURL + '/' + store.state.user.avatar
                        // 权限的匹配,通过路由元信息中的值 和当前用户的 角色 来匹配
                        if ( to.meta.roles.includes(store.state.user.role) === true ) {
                            // 通过 to 点出meta中的路由元信息,通过的话代码继续往下走
                            next()
                        } else {
                            // 代表用户没有在权限中,提示用户不可同行
                            Message.warning('您没有访问权限哦!')
                        }
                    }
                    }
            })
        }
    }
})
// 将路由暴露出去
export default router
