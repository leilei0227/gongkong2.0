import request from '@/utils/request'
export function errorList(data) {
    return request({
        url: '/api/monitor/errorList.json',
        method: 'post',
        data
    })
}