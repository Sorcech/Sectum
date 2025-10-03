import { ProjectInfo } from "~/store/type/type";
import { ProjectCreate } from "~/store/type/type";
import { request } from "../axios";

/**
 * @description 封装Project类型的接口方法
 */
export class Project {
    //创建项目
    static async Create(params: ProjectCreate) {
        return request('/project/create', 'POST', params)
    }
    //获取项目列表
    static async List(params?: any) {
        return request('/project/list', 'GET', params)
    }
    //修改项目内容
    static async Update(params: ProjectInfo) {
        return request('/project/update', 'PUT', params)
    }
    //删除项目
    static async Delete(params: ProjectInfo) {
        return request('/project/delete', 'DELETE', params)
    }
    //获取项目详情
    static async Profile(params: ProjectInfo) {
        return request('/project/profile', 'POST', params)
    }
}