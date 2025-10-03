import {
  PartTable, PartDetail, SectionTable, SectionDetail, SourceTable,
  StandardTable, StandardDetail, ProjectTable, ProjectDetail, TaskTable,
  TaskDetail, StorageTable, StorageDetail
} from '~/store/type/sheet'
import { request } from '../axios'

/**
 * @description 数据维护
 */
export class Sheet {
  static async PartTable(params?: PartTable) {
    return request('/sheet/parttable', 'GET', params)
  }
  static async PartDetail(params: PartDetail) {
    return request('/sheet/partdetail', 'POST', params)
  }
  static async MaterialSelect(params?: any) {
    return request('/sheet/materialselect', 'GET', params)
  }
  static async SurfaceSelect(params?: any) {
    return request('/sheet/surfaceselect', 'GET', params)
  }
  static async StandardSelect(params?: any) {
    return request('/sheet/standardselect', 'GET', params)
  }
  static async SymbolSelect(params?: any) {
    return request('/sheet/symbolselect', 'GET', params)
  }
  static async MemberSelect(params?: any) {
    return request('/sheet/memberselect', 'GET', params)
  }
  static async BrandSelect(params?: any) {
    return request('/sheet/brandselect', 'GET', params)
  }
  static async ProjectSelect(params?: any) {
    return request('/sheet/projectselect', 'GET', params)
  }
  static async SectionTable(params?: SectionTable) {
    return request('/sheet/sectiontable', 'GET', params)
  }
  static async SectionDetail(params?: SectionDetail) {
    return request('/sheet/sectiondetail', 'POST', params)
  }
  static async SectionPartTable(params?: SectionDetail) {
    return request('/sheet/sectionparttable', 'POST', params)
  }
  static async SourceTable(params?: SourceTable) {
    return request('/sheet/sourcetable', 'GET', params)
  }
  static async SourceDetail(params?: SourceTable) {
    return request('/sheet/sourcedetail', 'POST', params)
  }
  static async StandardTable(params?: StandardTable) {
    return request('/sheet/standardtable', 'GET', params)
  }
  static async StandardDetail(params?: StandardDetail) {
    return request('/sheet/standarddetail', 'POST', params)
  }
  static async ProjectTable(params?: ProjectTable) {
    return request('/sheet/projecttable', 'GET', params)
  }
  static async ProjectDetail(params?: ProjectDetail) {
    return request('/sheet/projectdetail', 'POST', params)
  }
  static async TaskTable(params?: TaskTable) {
    return request('/sheet/tasktable', 'GET', params)
  }
  static async TaskDetail(params?: TaskDetail) {
    return request('/sheet/taskdetail', 'POST', params)
  }
  static async StorageTable(params?: StorageTable) {
    return request('/sheet/storagetable', 'GET', params)
  }
  static async StorageDetail(params?: StorageDetail) {
    return request('/sheet/storagedetail', 'POST', params)
  }
  static async InterlinkTable(params?: StorageTable) {
    return request('/sheet/interlinktable', 'GET', params)
  }
  static async InterlinkDetail(params?: StorageDetail) {
    return request('/sheet/interlinkdetail', 'POST', params)
  }
}