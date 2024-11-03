import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  id: string
  frameId: number
}

export const updateFrameId = async (params: paramsType) => {
  return await apiClient.put('/api/pictures', params).then((result) => result.json())
}
