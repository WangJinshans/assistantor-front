import request from './http'

export function addStockMark(data) {
    console.log(`data is: ${JSON.stringify(data)}`)
    return request({
        url: '/stockMark/add',
        method: 'post',
        data
    })
}

export function fetchStockMarkInfo() {
    return request({
        url: '/stockMark/info',
        method: 'get',
    })
}


export function fetchTopStockInfo() {
    return request({
        url: '/stock/top_info',
        method: 'get',
    })
}