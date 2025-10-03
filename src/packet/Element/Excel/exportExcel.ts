/**
 * 
 * @param json 服务端发过来的数据
 * @param name 导出Excel文件名称
 * @param titleArr 导出Excel表头
 * @param sheetName 导出sheetName名字
 */

import * as XLSX from 'xlsx'

export const exportExcel = (json: any, name: any, titleArr: any, sheetName: any) => {
  var data = new Array()
  var keyArray = new Array()
  const getLength = function (obj: any) {
    var count = 0
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        count++
      }
    }
    return count
  }
  for (const key1 in json) {
    if (json.hasOwnProperty(key1)) {
      const element = json[key1]
      var rowDataArray = new Array()
      for (const key2 in element) {
        if (element.hasOwnProperty(key2)) {
          const element2 = element[key2]
          rowDataArray.push(element2)
          if (keyArray.length < getLength(element)) {
            keyArray.push(key2)
          }
        }
      }
      data.push(rowDataArray)
    }
  }
  data.splice(0, 0, keyArray, titleArr)
  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()

  var wsrows = [{ hidden: true }]
  ws['!rows'] = wsrows
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  XLSX.writeFile(wb, name + '.xlsx')
}