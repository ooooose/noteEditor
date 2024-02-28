import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  id: number
}

export const deleteComment = async (params: paramsType) => {
  return await apiClient.apiDelete('/api/comments', params).then((result) => result.json())
}
