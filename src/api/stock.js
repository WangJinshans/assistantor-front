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

export function fetchStockHistoryInfo(data) {
    var stock_id = data['stock_id']
    var market = data['stock_market']
    return request({
        url: `/v1/stock/stock_history?stock_id=${stock_id}&stock_market=${market}`,
        method: 'get',
        data
    })
}

export function fetchAsiaStockInfo() {
    return request({
        url: '/v1/stock/asia_stock',
        method: 'get',
    })
}

export function fetchEuropStockInfo() {
    return request({
        url: '/v1/stock/europe_stock',
        method: 'get',
    })
}

export function fetchAmerStockInfo() {
    return request({
        url: '/v1/stock/amer_stock',
        method: 'get',
    })
}

export function fetchAusStockInfo() {
    return request({
        url: '/v1/stock/aus_stock',
        method: 'get',
    })
}