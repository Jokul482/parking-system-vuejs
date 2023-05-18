import request from '@/utils/request'
const qs = require('qs');
const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

// 收费统计列表
export function getChargeList(params) {
    return request({
        url: '/my/charge/getChargeList',
        method: 'get',
        headers,
        params
    })
}

// 总收费概览
export function getOverviewData() {
    return request({
        url: '/my/charge/getOverviewData',
        method: 'get',
        headers
    })
}