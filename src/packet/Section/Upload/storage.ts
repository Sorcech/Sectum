import type { StorageUploadRes, StorageUploadsRes } from './StorageType'

function getBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return ''
}

export class Storage {
  static async Upload(file: File): Promise<StorageUploadRes> {
    const formData = new FormData()
    formData.append('File', file)
    const response = await fetch(`${getBaseUrl()}/storage/upload`, {
      method: 'POST',
      body: formData
    })
    const json: any = await response.json().catch(() => ({}))
    const data = json?.Data ?? json?.data ?? json ?? {}
    return {
      Storage: data.Storage ?? data.storage ?? 0,
      Name: data.Name ?? data.name ?? '',
      Size: data.Size ?? data.size ?? 0,
      Type: data.Type ?? data.type ?? '',
      Bucket: data.Bucket ?? data.bucket ?? '',
      Link: data.Link ?? data.link ?? ''
    }
  }

  static async Uploads(files: File[]): Promise<StorageUploadsRes[]> {
    const formData = new FormData()
    files.forEach((file) => formData.append('Files', file))
    const response = await fetch(`${getBaseUrl()}/storage/uploads`, {
      method: 'POST',
      body: formData
    })
    const json: any = await response.json().catch(() => ({}))
    const data = json?.Data ?? json?.data ?? json ?? []
    const results = Array.isArray(data) ? data : [data]
    return results.map((item: any) => ({
      Storage: item.Storage ?? item.storage ?? 0,
      Name: item.Name ?? item.name ?? '',
      Size: item.Size ?? item.size ?? 0,
      Type: item.Type ?? item.type ?? '',
      Bucket: item.Bucket ?? item.bucket ?? '',
      Link: item.Link ?? item.link ?? ''
    }))
  }
}
