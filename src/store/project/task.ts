import { request } from '../axios'
import { TaskInfo, TaskCreate } from '~/store/type/type'

/**
 * @description 任务相关
 */
export class Task {
  //新建任务
  static async Create(params: TaskCreate) {
    return request('/task/create', 'POST', params,)
  }
  //获取任务列表
  static async List() {
    return request('/task/list', 'GET')
  }
  //修改任务内容
  static async Update(params: TaskInfo) {
    return request('/task/update', 'PUT', params)
  }
  //删除任务（子任务）
  static async Delete(params: TaskInfo) {
    return request('/task/delete', 'DELETE', params,)
  }
}
