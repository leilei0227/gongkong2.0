import request from '@/utils/request'

export function getOpData(type, day, scope) {
    return request({
        url: '/api/op/getOpData.json',
        method: 'post',
        data: { type, day, scope }
    })
}
export function getOpData2(type, startYear, scope) {
    return request({
        url: '/api/op/getOpData.json',
        method: 'post',
        data: { type, startYear, scope }
    })
}
export function getOpData3(type, startMonth, scope) {
    return request({
        url: '/api/op/getOpData.json',
        method: 'post',
        data: { type, startMonth, scope }
    })
}
export function getCommittedData(type, day, scope) {
    return request({
        url: '/api/op/getCommittedData.json',
        method: 'post',
        data: { type, day, scope }
    })
}
export function getCommittedData2(type, startYear, scope) {
    return request({
        url: '/api/op/getCommittedData.json',
        method: 'post',
        data: { type, startYear, scope }
    })
}
export function getCommittedData3(type, startMonth, scope) {
    return request({
        url: '/api/op/getCommittedData.json',
        method: 'post',
        data: { type, startMonth, scope }
    })
}
export function getUnit(unitId) {
    return request({
        url: '/api/unit/getUnit.json',
        method: 'post',
        data: { unitId }
    })
}