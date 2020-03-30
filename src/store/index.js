// 导入vue实例
import Vue from 'vue'
// 注册vuex
import Vuex from 'vuex'
// use一下vuex
Vue.use(Vuex)
// 创建仓库对象
const store = new Vuex.Store({
    state: {
        // 用户的信息,初始值为undefined
        user: undefined
    }
})
// 暴露出去
export default store