import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  userId: string
  pictureId: string
}

export const deleteLike = async (params: paramsType) => {
  return await apiClient.apiDelete('/api/likes', params).then((result) => result.json())
}
