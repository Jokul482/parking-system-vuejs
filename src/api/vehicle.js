import request from '@/utils/request'
const qs = require('qs');
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

// 车位列表
export function getVehicleList(params) {
    return request({
        url: '/my/vehicle/getVehicleList',
        method: 'get',
        headers,
        params
    })
}

// 新增车位
export function postAddVehicle(data) {
    return request({
        url: '/my/vehicle/postAddVehicle',
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}

// 获取车位数据
export function getVehicleInfo(params) {
    return request({
        url: '/my/vehicle/getVehicleInfo',
        method: 'get',
        headers,
        params
    })
}

// 更新车位数据
export function postUpdateVehicleInfo(data) {
    return request({
        url: '/my/vehicle/postUpdateVehicleInfo',
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}

// 更新车位数据
export function deleteVehicleInfo(id) {
    return request({
        url: `/my/vehicle/deleteVehicleInfo/${id}`,
        method: 'get',
        headers,
    })
}