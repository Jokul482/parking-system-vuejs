import request from '@/utils/request'
const qs = require('qs');
const baseUrl = '/my';
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
// 用户列表
export function getUserList(params) {
    return request({
        url: baseUrl + '/getUserList',
        method: 'get',
        headers,
        params
    })
}
// 获取用户数据
export function getUserInfo(params) {
    return request({
        url: baseUrl + '/getUserInfo',
        method: 'get',
        headers,
        params
    })
}
// 更新用户数据
export function postUpdateUserInfo(data) {
    return request({
        url: baseUrl + '/updateUserInfo',
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}
// 删除用户数据
export function deleteUserInfo(id) {
    return request({
        url: baseUrl + `/deleteUser/${id}`,
        method: 'get',
        headers
    })
}