import request from '@/utils/request'
const qs = require('qs');
const baseUrl = '/my'
// 用户列表
export function getUserList(params) {
    return request({
        url: baseUrl + '/getUserList',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params
    })
}
// 获取用户数据
export function getUserInfo(params) {
    return request({
        url: baseUrl + '/getUserInfo',
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params
    })
}