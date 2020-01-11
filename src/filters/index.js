// 导入 vue 
import Vue from "vue";

// 导入moment 
import moment from "moment"
// 创建全局过滤器
Vue.filter('formatTime',function(value){
    // 处理并返回
    return moment(value).format("YYYY-MM-DD")
})