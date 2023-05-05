import request from '@/utils/request'
const qs = require('qs');
const baseUrl = '/api'
// 登录
export function login(data) {
  return request({
    url: baseUrl + '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 添加用户
export function addUser(data) {
  return request({
    url: baseUrl + '/reguser',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}