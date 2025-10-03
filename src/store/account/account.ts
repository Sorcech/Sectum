import { AccountInfo } from "~/store/type/type";
import { request } from "../axios";

/**
 * @description 账户服务
 */
export class Account {
  static async Login(params: AccountInfo) {
    return request('/login', 'POST', params)
  }
  static async Refresh() {
    return request('/account/refresh', 'GET')
  }
  static async Logout() {
    return request('/account/logout', 'GET')
  }
  static async IsLogin() {
    return request('/account/islogin', 'GET')
  }
  static async Register(params: AccountInfo) {
    return request('/account/register', 'POST', params)
  }
  static async ChangePassword(params: AccountInfo) {
    return request('/account/changePassword', 'POST', params)
  }
  static async List() {
    return request('/account/list', 'GET',)
  }
}