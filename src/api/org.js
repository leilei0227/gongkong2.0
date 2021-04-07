import request from '@/utils/request'

export function subList(data) {
    return request({
        url: '/api/unit/subList.json',
        method: 'post',
        data
    })
}

export function fetchList(query) {
    return request({
        url: '/api/org',
        method: 'get',
        params: query
    })
}

export function saveOrg(data) {
    return request({
        url: '/api/org',
        method: 'post',
        data
    })
}

export function updateOrg(orgId, data) {
    return request({
        url: `/api/org/${orgId}`,
        method: 'put',
        data
    })
}

export function deleteOrg(orgId) {
    return request({
        url: `/api/org/${orgId}`,
        method: 'delete'
    })
}