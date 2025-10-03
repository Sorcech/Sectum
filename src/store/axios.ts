import axios from "axios";
import router from "~/router";
import { Store } from "../packet/Util/storage";
import { showMessage } from "./status";

//接口超时时间
axios.defaults.timeout = 60000;

//请求地址
axios.defaults.baseURL = 'http://123.60.25.193:8888/';
//axios.defaults.baseURL = 'http://127.0.0.1:8888/';

//Http request Token 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    config.headers.set('Authorization', 'Bearer' + ' ' + Store.getLocalStorage('Token'))
    return config
  },
  error => {
    return Promise.reject(error)
  }
);
// Http response 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code == 5000) {
      router.push('/login')
    }
    return response
  },
  error => {
    const { response } = error;
    if (response) {
      showMessage(response.status); // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      alert('网路连接异常，请稍后再试!')
    }
  }
)
//封装Get Post 请求并导出
export function request(url: string, method: string, params?: any) {    //设置Url Params和Type的默认值
  return new Promise((resolve, reject) => {
    let promise
    if (method.toUpperCase() === 'GET') {
      promise = axios({ method: 'GET', url })
    } else if (method.toUpperCase() === 'POST') {
      promise = axios({ method: 'POST', url, params })
    } else if (method.toUpperCase() === 'PUT') {
      promise = axios({ method: 'PUT', url, params })
    } else if (method.toUpperCase() === 'DELETE') {
      promise = axios({ method: 'DELETE', url, params })
    } else {
      promise = axios({ url, params })
    }
    //处理返回
    promise.then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}