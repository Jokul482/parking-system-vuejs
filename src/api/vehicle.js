import request from '@/utils/request'
const qs = require('qs');
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
// 车辆列表
export function getRegistrationList(data) {
    return request({
        url: '/vehicle/getRegistrationList',
        method: 'get',
        headers,
        data: qs.stringify(data)
    })
}
// 添加车辆登记
export function postAddVehicle(data) {
    return request({
        url: '/vehicle/AddVehicle',
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}