import request from '@/utils/request'

export function subList(data) {
    return request({
        url: '/api/source/getLimit.json',
        method: 'post',
        data
    })
}