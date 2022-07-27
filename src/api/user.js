import request from './http'

export function getUserInfo(data) {
    console.log(`data is: ${JSON.stringify(data)}`)
    return request({
        url: '/v1/user/get_user_info',
        method: 'post',
        data
    })
}
