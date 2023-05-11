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

// 获取车辆数据
export function getRegistrationInfo(params) {
    return request({
        url: `/my/access/getRegistrationInfo`,
        method: 'get',
        headers,
        params
    })
}

// 更新车辆数据
export function postRegistrationInfo(data) {
    return request({
        url: `/my/access/postRegistrationInfo`,
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}

// 删除车辆数据
export function deleteRegistration(id) {
    return request({
        url: `/my/access/deleteRegistration/${id}`,
        method: 'post',
        headers
    })
}

// 车辆结算数据列表
export function getSettlementList(params) {
    return request({
        url: `/my/access/getSettlementList`,
        method: 'get',
        headers,
        params
    })
}

// 车辆结算
export function postSettlementDeparture(data) {
    return request({
        url: `/my/access/postSettlementDeparture`,
        method: 'post',
        headers,
        data: qs.stringify(data)
    })
}