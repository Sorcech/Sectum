import { AppendixDelete, AppendixList } from '~/store/type/sheet'
import { request } from '../axios'
/**
 * @description 封装Appendix类型的接口方法
 */
export class Appendix {
  static async Create(params: AppendixList) {
    return request('/appendix/create', 'POST', params)
  }
  static async Delete(params: AppendixDelete) {
    return request('/appendix/delete', 'DELETE', params)
  }
}
