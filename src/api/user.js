import request from '@/utils/request'
export function userList(data) {
    return request({
        url: '/api/user/list.json',
        method: 'post',
        data
    })
}

//原始
export function fetchList(query) {
    return request({
        url: 'api/user/list.json',
        method: 'get',
        params: query
    })
}

export function createUser(
    unitId,
    username,
    role,
    realName,
    phone,
    dutyStatus,
    userType,
) {
    return request({
        url: `/api/user/saveUser.json`,
        method: 'post',
        data: {
            unitId,
            username,
            role,
            realName,
            phone,
            dutyStatus,
            userType,

        }
    })
}


export function updateUser(unitId,
    username,
    role,
    realName,
    phone,
    dutyStatus,
    userType,
    id) {
    return request({
        url: `/api/user/saveUser.json`,
        method: 'post',
        data: {
            unitId,
            username,
            role,
            realName,
            phone,
            dutyStatus,
            userType,
            id
        }
    })
}

export function deleteUser(userId) {
    return request({
        url: '/api/user/del.json',
        method: 'post',
        data: { userId }
    })
}
export function login(data) {
    return request({
        url: '/api/user/login.json',
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