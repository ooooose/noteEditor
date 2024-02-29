import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  userId: string
  pictureId: string
}

export const postLike = async (params: paramsType) => {
  return await apiClient.apiPost('/api/likes', params).then((result) => result.json())
}
