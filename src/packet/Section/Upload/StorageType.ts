export interface StorageUploadReq {
  File: File
}

export interface StorageUploadRes {
  Storage: number
  Name: string
  Size: number
  Type: string
  Bucket: string
  Link: string
}

export interface StorageUploadsReq {
  Files: File[]
}

export interface StorageUploadsRes {
  Storage: number
  Name: string
  Size: number
  Type: string
  Bucket: string
  Link: string
}
