import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  email: string
  pictureId: string
}

export const postLike = async (params: paramsType) => {
  return await apiClient.apiPost('/api/likes', params).then((result) => result)
}
