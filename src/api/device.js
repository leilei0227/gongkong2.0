import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/api/source/list.json',
        method: 'get',
        data
    })
}
//设备维护
export function alarmList(type) {
    return request({
        url: '/api/source/alarmList.json',
        method: 'post',
        data: { type }
    })
}
//备件管理
export function storageLimit() {
    return request({
        url: '/api/source/storageLimit.json',
        method: 'get',
        data
    })
}