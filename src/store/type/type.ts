
export interface TaskInfo {
  TaskId: number,
  Title: string,
  IsCompleted: boolean
}

export interface TaskCreate {
  Name: string,
  Project: number,
  EndAt: string
}
export interface ProjectInfo {
  ProjectId: number,
  Code: number,
  Name: string,
}
export interface ProjectCreate {
  Type: number,
  Name: string,
}

export interface AccountInfo {
  Passport: string,
  Password: string
}
export interface AccountProfile {
  AccountId: number,
  Code: number,
  Ver: number,
  Name: string,
  Phone: number,
  Gender: string,
  Birthday: string,
  Detail: string,
  CreateBy?: string,
  CreateAt?: string,
  UpdateBy?: string,
  UndateAt?: string,
  DeleteBy?: string,
  DeleteAt?: string,
  Remark?: string,
}



