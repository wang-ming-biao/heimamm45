// 1.导入axios
import axios from 'axios'

// 2.导入token函数
import {getToken} from '../utils/token.js'

// 创建一个 学科页面使用 请求对象
const request = axios.create({
    baseURL: process.env.VUE_APP_BASEURL
});

// 拦截器
// 添加请求拦截器
request.interceptors.request.use(
    function(config){
        // 在发送之前 干一些 事情
        // 设置请求头 携带token
        config.headers.token = getToken()
        return config;
    },
    function(error){
        // 在请求错误的时候 干一些事情 
        return Promise.reject(error);
    }
);
// 添加响应拦截器
request.interceptors.response.use(
    function(response){
        // 对响应的数据做一些事情
        // .then 还没有出发
        //把 .data 处理掉 .then中少些一个  .el-icon-data-analysis
        return response.data;
    },
    function(error){
        // 响应出错时,干一些事情
        return Promise.reject(error);
    }
);
export default request