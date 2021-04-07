import request from '@/utils/request'

export function errorList(data) {
    return request({
        url: '/api/monitor/errorList.json',
        method: 'post',
        data
    })
}
export function confirmError(data) {
    return request({
        url: '/api/monitor/confirmError.json',
        method: 'post',
        data
    })
}
export function saveResult(data) {
    return request({
        url: '/api/monitor/saveResult.json',
        method: 'post',
        data
    })
}
export function getForm(data) {
    return request({
        url: '/api/form/getForm.json',
        method: 'post',
        data
    })
}