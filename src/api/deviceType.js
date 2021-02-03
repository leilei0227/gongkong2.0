import request from '@/utils/request'
export function fetchList(query) {
    return request({
        url: '/api/deviceType/list.json',
        method: 'get',
        params: query
    })
}