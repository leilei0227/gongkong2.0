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
export function getTagConfigs(deviceTypeId) {
    return request({
        url: '/api/deviceType/getTagConfigs.json',
        method: 'post',
        data: { deviceTypeId }
    })
}
export function getTagConfig(tagConfigId) {
    return request({
        url: '/api/deviceType/getTagConfig.json',
        method: 'post',
        data: { tagConfigId }
    })
}
export function getRecycleConfig(deviceTypeId) {
    return request({
        url: '/api/deviceType/getRecycleConfigs.json',
        method: 'post',
        data: { deviceTypeId }
    })
}
export function addTagType(data) {
    return request({
        url: '/api/deviceType/addTagType.json',
        method: 'post',
        data
    })
}
export function delTagConfig(tagConfigId) {
    return request({
        url: '/api/deviceType/delTagConfig.json',
        method: 'post',
        data: { tagConfigId }
    })
}
export function diagnosisList(deviceTypeId) {
    return request({
        url: '/api/diagnosis/list.json',
        method: 'post',
        data: { deviceTypeId }
    })
}
export function diagnosisdel(id) {
    return request({
        url: '/api/diagnosis/del.json',
        method: 'post',
        data: { id }
    })
}
export function diagnosisSave(deviceTypeId, advice, tagValues, results) {
    return request({



        url: '/api/diagnosis/save.json',
        method: 'post',
        data: { deviceTypeId, advice, tagValues, results }
    })
}
export function saveRecycleConfigs(data) {
    return request({
        url: '/api/deviceType/saveRecycleConfigs.json',
        method: 'post',
        data
    })
}