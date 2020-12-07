import request from '@/utils/request'

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