import axios from 'axios'
/**
 * @description 封装Storage类型的接口方法
 */
export class Storage {
  static async Upload(formData: FormData) {
    return new Promise((resolve, reject) => {
      let promise
      promise = axios({
        method: 'POST',
        url: '/storage/upload',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      })
      //处理返回
      promise.then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }


  static async Uploads(formData: FormData) {
    return new Promise((resolve, reject) => {
      let promise
      promise = axios({
        method: 'POST',
        url: '/storage/uploads',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData
      })
      //处理返回
      promise.then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
