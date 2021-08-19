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
export function getUnit(unitId) {
    return request({
        url: '/api/unit/getUnit.json',
        method: 'post',
        data: { unitId }
    })
}
export function getUnits(parentId) {
    return request({
        url: '/api/unit/getUnits.json',
        method: 'post',
        data: { parentId }
    })
}
export function changeUnit(unitId) {
    return request({
        url: '/api/unit/changeUnit.json',
        method: 'post',
        data: { unitId }
    })
}