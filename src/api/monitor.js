import request from '@/utils/request'

export function errorList(data) {
    return request({
        url: '/api/monitor/errorList.json',
        method: 'post',
        data
    })
}

export function myErrorList(data) {
    return request({
        url: '/api/monitor/myErrorList.json',
        method: 'post',
        data
    })
}
export function confirmError(errorId, status) {
    return request({
        url: '/api/monitor/confirmError.json',
        method: 'post',
        data: {

            errorId,
            status
        }
    })
}
export function saveResult(errorId, result, errorReason) {
    return request({
        url: '/api/monitor/saveResult.json',
        method: 'post',
        data: { errorId, result, errorReason }
    })
}
export function getForm(errorId) {
    return request({
        url: '/api/form/getForm.json',
        method: 'post',
        data: { errorId }
    })
}
export function getUserList(dutyStatus) {
    return request({
        url: '/api/user/getUserList.json',
        method: 'post',
        data: { dutyStatus }
    })
}
export function getUserListT(userType) {
    return request({
        url: '/api/user/getUserList.json',
        method: 'post',
        data: { userType }
    })
}
export function save(errorId, station, happenTime, reportTime, errorCategory, deviceNo, dutyId, masterId, errorDesc) {
    return request({
        url: '/api/form/save.json',
        method: 'post',
        data: { errorId, station, happenTime, reportTime, errorCategory, deviceNo, dutyId, masterId, errorDesc }
    })
}
export function subList(deviceId) {
    return request({
        url: '/api/device/subList.json',
        method: 'post',
        data: { deviceId }
    })
}
export function getDevice(deviceId) {
    return request({
        url: '/api/device/getDevice.json',
        method: 'post',
        data: { deviceId }
    })
}
export function getDeviceByLink(deviceLink) {
    return request({
        url: '/api/source/getDeviceByLink.json',
        method: 'post',
        data: { deviceLink }
    })
}
export function recycleList(deviceId) {
    return request({
        url: '/api/device/recycleList.json',
        method: 'post',
        data: { deviceId }
    })
}
export function deviceInfo(mac) {
    return request({
        url: '/api/it/deviceInfo.json',
        method: 'post',
        data: { mac }
    })
}
export function estimate(deviceId) {
    return request({
        url: '/api/diagnosis/estimate.json',
        method: 'post',
        data: { deviceId }
    })
}