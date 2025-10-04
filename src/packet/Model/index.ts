import type { App } from 'vue'
import TaskCreate from './Form/TaskCreate.vue'
import AccountCreate from './Form/AccountCreate.vue'
import ProjectCreate from './Form/ProjectCreate.vue'
import PartDetail from './Detail/PartDetail.vue'
import SectionDetail from './Detail/SectionDetail.vue'
import SourceDetail from './Detail/SourceDetail.vue'
import StandardDetail from './Detail/StandardDetail.vue'
import ProjectDetail from './Detail/ProjectDetail.vue'
import TaskDetail from './Detail/TaskDetail.vue'
import StorageDetail from './Detail/StorageDetail.vue'
import InterlinkDetail from './Detail/InterlinkDetail.vue'

// Select 组件已移除，请使用 Section/Select 组件


// 导出所有组件
export {
  TaskCreate, AccountCreate, ProjectCreate,
  PartDetail, SectionDetail, SourceDetail, StandardDetail, ProjectDetail, TaskDetail, StorageDetail, InterlinkDetail
}

const install = (app: App) => {
  app.component('TaskCreate', TaskCreate)//任务创建表单
  app.component('AccountCreate', AccountCreate)//账户创建表单
  app.component('ProjectCreate', ProjectCreate)//项目创建表单
  app.component('PartDetail', PartDetail)//零件详细信息
  app.component('SectionDetail', SectionDetail)//组件详细信息
  app.component('SourceDetail', SourceDetail)//源码详细信息
  app.component('StandardDetail', StandardDetail)//标准详细信息
  app.component('ProjectDetail', ProjectDetail)//项目详细信息
  app.component('TaskDetail', TaskDetail)//任务详细信息
  app.component('StorageDetail', StorageDetail)//文件详细信息
  app.component('InterlinkDetail', InterlinkDetail)//内部链接详细信息

}

export default install //全局引用