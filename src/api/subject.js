// 导入请求拦截器
import subjectRequest from "../utils/sb.js"
// 抽取接口方法
// 获取列表
export function subjectList(params){
    return subjectRequest({
        url:"/subject/list",
        method:"get",
        params
    })
}

// 添加学科
export function subjectAdd(data){
    return subjectRequest({
        url:"/subject/add",
        method:"post",
        data
    })
}
// 状态修改
export function subjectStatus(data){
    return subjectRequest({
        url:"/subject/status",
        method:"post",
        data
    })
}
// 删除学科
export function subjectRemove(data){
    return subjectRequest({
        url:"/subject/remove",
        method:"post",
        data
    })
}
//获取编辑学科
export function subjectEdit(data){
    return subjectRequest({
        url:"/subject/edit",
        method:"post",
        data
    })
}