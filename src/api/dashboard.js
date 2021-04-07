import request from '@/utils/request'
export function getAuth(data) {
    return request({
        url: 'api/user/getAuth.json',
        method: 'post',
        data
    })
}
export function subList(data) {
    return request({
        url: '/api/unit/subList.json',
        method: 'post',
        data
    })
}
export function statistics(data) {
    return request({
        url: '/api/index/statistics.json',
        method: 'post',
        data
    })
}