//设备监控/自控
import request from '@/utils/request'

export function subList(deviceId) {
    return request({
        url: '/api/device/subList.json',
        method: 'post',
        data: { deviceId }
    })
}