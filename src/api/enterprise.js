// 导入请求拦截器
import enterpriseRequest from "../utils/request.js"

// 抽取接口方法
// 获取列表
export function enterpriseList(params){
    return enterpriseRequest({
        url:'/enterprise/list',
        method:'get',
        params
    })
}

// 企业添加接口
export function enterpriseAdd(data){
    return enterpriseRequest({
        url:"/enterprise/add",
        method:"post",
        data
    })
}

// 修改企业状态,启用或禁用账号
export function enterpriseStatus(data){
    return enterpriseRequest({
        url:"/enterprise/status",
        method:"post",
        data
    })
}

// 企业删除接口
export function enterpriseRemove(data){
    return enterpriseRequest({
        url:"/enterprise/remove",
        method:"post",
        data
    })
}

// 企业编辑接口
export function enterpriseEdit(data){
    return enterpriseRequest({
        url:"/enterprise/edit",
        method:"post",
        data
    })
}