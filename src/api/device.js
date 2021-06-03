import request from '@/utils/request'
import qs from 'qs'
export function fetchList(data) {
    return request({
        url: '/api/source/list.json',
        method: 'post',
        data
    })
}
//设备列表-删除
export function deleteDevice(deviceId) {
    return request({
        url: '/api/source/delDevice.json',
        method: 'post',
        data: { deviceId }
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
export function storageLimit(data) {
    return request({
        url: '/api/source/storageLimit.json',
        method: 'post',
        data
    })
}
export function saveStorageLimit(typeId, count, location) {
    return request({
        url: '/api/source/saveStorageLimit.json',
        method: 'post',
        data: { typeId, count, location }
    })
}
export function saveDevice(typeId, firm, installer,
    owner,
    integrator, ) {
    // let a = firm.name
    firm = {
        name: firm.name,
        number: firm.number,
        deviceName: firm.deviceName[0],
        lng: firm.lng,
        lat: firm.lat
    }
    installer = {
        lng: installer.lng,
        lat: installer.lat
    }
    integrator = {
        lng: integrator.lng,
        lat: integrator.lat
    }
    owner = {
        lng: owner.lng,
        lat: owner.lat
    }
    return request({
        url: '/api/source/saveDevice.json',
        method: 'post',
        // data: { firm: JSON.stringify(a) }
        data: {
            typeId,
            //qs.stringify { firm },
            //  firm: qs.parse(firm),
            'firm.name': firm.name,
            'firm.number': firm.number,
            'firm.deviceName': firm.deviceName,
            'firm.lng': firm.lng,
            'firm.lat': firm.lat,
            'installer.lng': installer.lng,
            'installer.lat': installer.lat,
            'integrator.lng': integrator.lng,
            'integrator.lat': integrator.lat,
            'owner.lng': owner.lng,
            'owner.lat': owner.lat
        }
    })
}