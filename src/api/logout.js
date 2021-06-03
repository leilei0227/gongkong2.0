import request from '@/utils/request'

export function logout(data) {
    return request({
        url: '/api/user/logout.json',
        method: 'post',
        data
    })
}