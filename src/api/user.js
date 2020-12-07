import request from '@/utils/request'
export function fetchList(query) {
  return request({
    url: '/user/getAuth.json',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/api/user',
    method: 'post',
    data
  })
}

export function updateUser(userId, data) {
  return request({
    url: `/api/user/${userId}`,
    method: 'put',
    data
  })
}

export function deleteUser(query) {
  return request({
    url: '/api/user',
    method: 'delete',
    params: query
  })
}
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
