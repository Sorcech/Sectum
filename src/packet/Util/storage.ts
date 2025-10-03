export class Store {
  /**
   * 获取Cookie值
   */
  static getCookie = (key: string) => {
    const name = key + "=";
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  /**
   * 设置Cookie值
   * exhours 保存时长，默认两小时
   */
  static setCookie = (key: string, value: any, exhours = 2) => {
    let currentTime = new Date().getTime();
    let expireTime = new Date(currentTime + (exhours + 8) * 60 * 60 * 1000);//北京时间：UTC+8
    const expires = "expires=" + expireTime.toUTCString();
    document.cookie = key + "=" + value + ";" + expires;
  }
  /**
   * 删除cookie值
   */
  static removeCookie = (key: string) => {
    const d = new Date();
    d.setTime(-1);
    const expires = "expires=" + d.toUTCString();
    document.cookie = key + "='';" + expires;
  }
  /**
   * 清除cookie值
   */
  static clearCookie = () => {
    Store.setCookie('', '', -1)
  }

  /**
   *  设置localStorage存储
   */
  static setLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取localStorage存储
   */
  static getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    try {
      return JSON.parse(data);
    } catch (error) {
      // 如果解析失败，直接返回原始字符串
      return data;
    }
  }
  /**
   * 删除localStorage存储
   */
  static removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  }
  /**
   * 清除localStorage存储
   */
  static clearLocalStorage = () => {
    localStorage.clear();
  }

  /**
   *  设置sessionStorage存储
   */
  static setSessionStorage = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 获取sessionStorage存储
   */
  static getSessionStorage = (key: string) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  /**
   * 删除SessionStorage存储
   */
  static removeSessionStorage = (key: string) => {
    sessionStorage.removeItem(key);
  }
  /**
   * 清除SessionStorage存储
   */
  static clearSessionStorage = () => {
    sessionStorage.clear();
  }
}