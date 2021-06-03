import request from '@/utils/request'
export function getNewTopology(data) {
    return request({
        url: '/api/device/getNewTopology.json',
        method: 'get',
        data
    })
}
export function getTopology(data) {
    return request({
        url: '/api/it/getTopology.json',
        method: 'get',
        data
    })
}