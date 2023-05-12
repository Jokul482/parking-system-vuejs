// 用户类型
export const roleType = [
    {
        role_type: 0,
        label: "管理员"
    },
    {
        role_type: 1,
        label: "普通用户"
    }
]
// 车位区域
export const vehicleArea = [
    {
        value: "1",
        label: "A区"
    },
    {
        value: "2",
        label: "B区"
    },
    {
        value: "3",
        label: "C区"
    }
]
// 车位类型
export const vehicleType = [
    {
        value: 1,
        label: "小型车车位"
    },
    {
        value: 2,
        label: "中型车车位"
    },
    {
        value: 3,
        label: "大型车车位"
    }
]
// 车位状态
export const vehicleStatus = [
    {
        value: 1,
        label: "空闲"
    },
    {
        value: 2,
        label: "正在使用"
    }
]
// 车辆类型
export const carType = [
    {
        value: 1,
        label: "小型车"
    },
    {
        value: 2,
        label: "中型车"
    },
    {
        value: 3,
        label: "大型车"
    }
]
// 获取车辆类型
export function getCarType(key) {
    switch (key) {
        case 1:
            return "小型车"
        case 2:
            return "中型车"
        case 3:
            return "大型车"
        default:
            return "--"
    }
}
// 车位区域
export function getArea(key) {
    switch (key) {
        case "1":
            return "A区"
        case "2":
            return "B区"
        case "3":
            return "C区"
        default:
            return "--"
    }
}
// 车位类型
export function getType(key) {
    switch (key) {
        case 1:
            return "小型车车位"
        case 2:
            return "中型车车位"
        case 3:
            return "大型车车位"
        default:
            return "--"
    }
}