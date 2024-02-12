import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  id: number
}

export const deleteComment = async (params: paramsType) => {
  await apiClient.apiDelete('/api/comments', params)
}
