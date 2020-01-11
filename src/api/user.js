// 导入拦截器插件
import userRequest from "../utils/sb.js"
// 抽取接口

// 获取用户信息列表
export function userList(params){
    return userRequest({
        url:"/user/list",
        method:"get",
        params
    })
}

// 后台创建用户
export function userAdd(data){
    return userRequest({
        url:"/user/add",
        method:"post",
        data
    })
}

// 修改用户状态 ,启用或者禁用账户
export function userStatus(data){
    return userRequest({
        url:"/user/status",
        method:"post",
        data
    })
}

// 用户删除
export function userRemove(data){
    return userRequest({
        url:"/user/remove",
        method:"post",
        data
    })
}

// 用户信息编辑
export function userEdit(data){
    return userRequest({
        url:"/user/edit",
        method:"post",
        data
    })
}

// 获取token
// export function getToken(data){
//     return userRequest({
//         url:"/token",
//         method:"post",
//         data 
//     })
// }