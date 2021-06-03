import request from '@/utils/request'

export function typeList(data) {
    return request({
        url: '/api/doc/typeList.json',
        method: 'post',
        data
    })
}
export function docList(pageNum, typeId) {
    return request({
        url: '/api/doc/docList.json',
        method: 'post',
        data: { pageNum, typeId }
    })
}
export function docDelete(id) {
    return request({
        url: '/api/doc/delete.json',
        method: 'post',
        data: { id }
    })
}
export function docUpload(id, file) {
    return request({
        url: '/api/doc/upload.json',
        method: 'post',
        data: { id, file }
    })
}