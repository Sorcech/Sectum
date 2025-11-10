// ==================== Sheet 相关类型 ====================

export interface PartTable {
  PartId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Unit?: string,
  Detail?: string,
  Mass?: number,
  Material?: string,
  Surface?: string,
  Standard?: string,
  Symbol?: string,
}

export interface PartDetail {
  PartId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Unit?: string,
  Detail?: string,
  Mass?: string,
  Material?: string,
  Surface?: string,
  Standard?: string,
  Symbol?: string,
  Select: SelectList[],
  File: FileList[],
  DesignBy?: string,
  DesignAt?: string,
  DraftBy?: string,
  DraftAt?: string,
  InspectBy?: string,
  InspectAt?: string,
  DirectBy?: string,
  DirectAt?: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}

export interface SelectList {
  BrandId: number,
  Brand: string,
  Purchase: PurchaseList[]
}
export interface PurchaseList {
  Model: string,
  Cost: number,
  Price: number,
}
export interface AppendixList {
  AppendixId?: number,
  DataId: number,
  StorageId: number
}
export interface AppendixDelete {
  AppendixId: number
}
export interface FileList {
  Name: string,
  Type: string,
  Link: string,
}
export interface SectionTable {
  SectionId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Detail?: string,
}
export interface SectionDetail {
  SectionId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Detail?: string,
  Select: SelectList[],
  File: FileList[],
  DesignBy?: string,
  DesignAt?: string,
  DraftBy?: string,
  DraftAt?: string,
  InspectBy?: string,
  InspectAt?: string,
  DirectBy?: string,
  DirectAt?: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}
export interface SectionPartTable {
  PartId: number,
  Name: string,
  Model: string,
  Mass: number,
  Quantity: number,
  Reference: string,
}
export interface SourceTable {
  SectionId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Detail?: string,
}
export interface SourceDetail {
  SourceId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Detail?: string,
  File: FileList[],
  DesignBy?: string,
  DesignAt?: string,
  DraftBy?: string,
  DraftAt?: string,
  InspectBy?: string,
  InspectAt?: string,
  DirectBy?: string,
  DirectAt?: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}
export interface StandardTable {
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Point: number,
  Detail?: string,
  Desity: string,
  Yield: string,
  Ultima: string,
  Elastic: string,
}
export interface StandardDetail {
  StandardId: number,
  Code: number,
  Ver: number,
  Name: string,
  Model: string,
  Point: number,
  Detail?: string,
  Desity: string,
  Yield: string,
  Ultima: string,
  Elastic: string,
  File: FileList[],
  DesignBy?: string,
  DesignAt?: string,
  DraftBy?: string,
  DraftAt?: string,
  InspectBy?: string,
  InspectAt?: string,
  DirectBy?: string,
  DirectAt?: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}
export interface ProjectTable {
  Code: number,
  Ver: number,
  Name: string,
  Purpose: string,
  Target: string,
}
export interface ProjectDetail {
  ProjectId: number,
  Code: number,
  Ver: number,
  Name: string,
  Purpose: string,
  Target: string,
  CreateBy?: string,
  CreateAt?: string,
  InspectBy?: string,
  InspectAt?: string,
  DirectBy?: string,
  DirectAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}
export interface TaskTable {
  TaskId: number,
  Title: string,
  IsCompleted: boolean,
  Sponsor: string,
  Executor: string,
  Profile: string,
  StartAt: string,
  EndAt: string,
}
export interface TaskDetail {
  TaskId: number,
  Title: string,
  IsCompleted: boolean,
  Sponsor: string,
  Executor: string,
  Profile: string,
  StartAt: string,
  EndAt: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}
export interface StorageTable {
  StorageId: number,
  Name: string,
  Size: number,
  Type: string,
  Bucket: string,
  Link: string,
}
export interface StorageDetail {
  StorageId: number,
  Name: string,
  Size: number,
  Type: string,
  Bucket: string,
  Link: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}
export interface InterlinkTable {
  Code: number,
  Ver: number,
  Name: string,
  Contact: string,
  Phone: string,
  Gender: string,
  Birthday: string,
  Detail: string
  Address: string,
  Website: string,
}
export interface InterlinkDetail {
  InterlinkId: number,
  Code: number,
  Ver: number,
  Name: string,
  Contact: string,
  Phone: string,
  Gender: string,
  Birthday: string,
  Detail: string,
  Address: string,
  Website: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}

// ==================== Config 相关类型 ====================

// 轮播图单页配置类型
export interface CarouselSlide {
  image: string  // 图片链接
  title: string  // 标题（支持国际化 key）
  description: string  // 描述（支持国际化 key）
  link: string | null  // 链接（可选）
}

// 轮播图配置类型
export interface CarouselConfig {
  autoplay: boolean  // 是否自动播放
  interval: number  // 自动播放间隔（毫秒）
  pauseOnHover: boolean  // 鼠标悬停时是否暂停
  height: string  // 轮播图高度
  slides: CarouselSlide[]  // 轮播图数据
}

// 项目基本信息类型
export interface ProjectInfo {
  name: string  // 项目名称
  description: string  // 项目描述
  version: string  // 项目版本
  homepage: string  // 项目主页
  author: string  // 作者
  keywords: string[]  // 关键词
  license: string  // 许可证
  logoIcon?: string  // Logo 图标名称（FontAwesome 图标名），用于设置 favicon
}

// 页脚配置类型
export interface FooterConfig {
  copyrightHolder: string  // 版权持有者
  icpNumber: string  // ICP 备案号
  additionalInfo: string  // 额外信息
}

// 用户配置类型
export interface UserConfig {
  profileLink: string  // 用户中心链接
}

// 完整配置类型
export interface AppConfig {
  project: ProjectInfo  // 项目基本信息
  carousel: CarouselConfig  // 轮播图配置
  footer: FooterConfig  // 页脚配置
  user: UserConfig  // 用户链接
}

