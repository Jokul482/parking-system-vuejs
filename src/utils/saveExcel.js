/**
 * @description: 根据后端数据 导出excel
 * @param {
 *  配置文件  数组  
 *  options: [{
 *      key：  表头
 *      value： 对应的值 
 *  }]；
 * 
 *  data： 后端接口数据  注意：有些字典需要翻译
 *  name： 表格的名字
 * }
 * @return {*}
 */
const ExportJsonExcel = require("js-export-excel");

export default function(options, data, name ){
    const option = {};
    option.fileName  = name
    
    let sheetFilter = []
    let sheetHeader = []
    let columnWidths = []
    let length = options.length
    options.forEach(item => {
        sheetFilter.push(item.value)
        sheetHeader.push(item.key)
        columnWidths.push(item.width?item.width:100/length)
    });


    option.datas = [{
        sheetData: data,
        sheetName: name || '默认名字',
        sheetFilter,
        sheetHeader,
        columnWidths
    }]
    
    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); 
}