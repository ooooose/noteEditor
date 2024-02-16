import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  email: string
  pictureId: string
}

export const deleteLike = async (params: paramsType) => {
  return await apiClient.apiDelete('/api/likes', params).then((result) => result)
}
