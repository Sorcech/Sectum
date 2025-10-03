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

import MaterialSelect from './Select/MaterialSelect.vue'
import SymbolSelect from './Select/SymbolSelect.vue'
import SurfaceSelect from './Select/SurfaceSelect.vue'
import StandardSelect from './Select/StandardSelect.vue'
import MemberSelect from './Select/MemberSelect.vue'
import BrandSelect from './Select/BrandSelect.vue'
import ProjectSelect from './Select/ProjectSelect.vue'


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

  app.component('MaterialSelect', MaterialSelect)//材质选择
  app.component('SurfaceSelect', SurfaceSelect)//表面处理/封装选择
  app.component('StandardSelect', StandardSelect)//标准选择
  app.component('SymbolSelect', SymbolSelect)//符号选择
  app.component('MemberSelect', MemberSelect)//用户选择
  app.component('BrandSelect', BrandSelect)//品牌选择
  app.component('ProjectSelect', ProjectSelect)//项目选择
}

export default install //全局引用