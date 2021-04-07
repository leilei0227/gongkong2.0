import request from '@/utils/request'

export function subList(deviceTypeId) {
    return request({
        url: '/api/deviceType/subList.json',
        method: 'post',
        data: { deviceTypeId }
    })
}
export function list(data) {
    return request({
        url: '/api/deviceType/list.json',
        method: 'post',
        data
    })
}
export function getTagConfig(deviceTypeId) {
    return request({
        url: '/api/deviceType/getTagConfigs.json',
        method: 'post',
        data: { deviceTypeId }
    })
}
export function getRecycleConfig(deviceTypeId) {
    return request({
        url: '/api/deviceType/getRecycleConfigs.json',
        method: 'post',
        data: { deviceTypeId }
    })
}
export function diagnosisList(deviceTypeId) {
    return request({
        url: '/api/diagnosis/list.json',
        method: 'post',
        data: { deviceTypeId }
    })
}