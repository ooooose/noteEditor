import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  email: string
  pictureId: string
}

export const deleteComment = async (params: paramsType) => {
  await apiClient.apiDelete('/api/comments', params)
}
