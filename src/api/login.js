// 导入axios
import axios from 'axios'

// 定义一个登陆方法, 并暴露出去
export function login(data){
    return axios({
        method: "post",
        url: process.env.VUE_APP_BASEURL + "/login",
        withCredentials: true,
        data,
      });
}
