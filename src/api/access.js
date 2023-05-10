import request from '@/utils/request'
const qs = require('qs');
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

// 车辆列表
export function getRegistrationList(params) {
    return request({
        url: '/my/access/getRegistrationList',
        method: 'get',
        headers,
        params
    })
}

// 添加车辆登记
export function postAddVehicle(data) {
    return request({
        url: '/my/access/postAddVehicle',
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}

// 获取车位信息
export function getVehicleInfo() {
    return request({
        url: '/my/access/getVehicleInfo',
        method: 'get',
        headers,
    })
}