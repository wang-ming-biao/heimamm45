// 导入axios
import axios from 'axios'

// 导入获取token的方法
import {getToken} from '../utils/token.js'

// 定义一个登陆方法, 并暴露出去
export function login(data){
    return axios({
        method: "post",
        url: process.env.VUE_APP_BASEURL + "/login",
        withCredentials: true,
        data,
      });
}

// 获取手机验证码, 并暴露出去
export function getCode(data){
    return axios({
        method: "post",
        url: process.env.VUE_APP_BASEURL + "/sendsms",
        withCredentials: true,
        data,
      });
}

// 设置注册方法, 并暴露出去
export function register(data){
    return axios({
        method: "post",
        url: process.env.VUE_APP_BASEURL + "/register",
        withCredentials: true,
        data,
      });
}

// 设置退出方法, 并暴露出去
export function logout(){
    return axios({
        method: "get",
        url: process.env.VUE_APP_BASEURL + "/logout",
        withCredentials: true,
        headers:{
          token:getToken()
        }
      });
}


// 获取用户信息
export function info(){
    return axios({
        method: "get",
        url: process.env.VUE_APP_BASEURL + "/info",
        withCredentials: true,
        headers:{
          // 当时如何存的值,后面就如何取
          // token:window.localStorage.getItem("heimammtoken")
          // 使用抽取好的token方法
          token:getToken()
        }
      });
}
