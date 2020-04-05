// 导入拦截器
import chartRequest from '../utils/request'

// 面板数据接口
export function chartTitle(data) {
    return chartRequest({
        url: '/data/title',
        method: 'post',
        data
    })
}

// 企业题目数据统计
export function  chartQuestion(data) {
    return chartRequest({
        url: '/data/statistics',
        method: 'post',
        data
    })
}

// 热门城市题目统计
export function chartHotCity(data) {
    return chartRequest({
        url: '/data/hot_cities',
        method: 'post',
        data
    })
}
