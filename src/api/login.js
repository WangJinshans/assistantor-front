import request from './http'

export function login(data, ctx_id) {
    console.log(`data is: ${JSON.stringify(data)}`)
    return request({
        url: '/login',
        method: 'post',
        headers: {'ctx_id': ctx_id},
        data
    })
}


export function logout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data
    })
}

export function register(data, ctx_id) {
    console.log(`data is: ${JSON.stringify(data)}`)
    return request({
        url: '/register',
        method: 'post',
        headers: {'ctx_id': ctx_id},
        data
    })
}


export function getPublicKey() {
    return request({
        url: '/get_public_key',
        method: 'get',
    })
}

