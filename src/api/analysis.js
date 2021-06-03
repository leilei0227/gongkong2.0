import request from '@/utils/request'
export function errorList(data) {
    return request({
        url: '/api/monitor/errorList.json',
        method: 'post',
        data
    })
}
export function statistics(deviceTypeIds, startYear, endYear, type) {
    return request({
        url: '/api/his/statistics.json',
        method: 'post',
        data: { deviceTypeIds, startYear, endYear, type }
    })
}