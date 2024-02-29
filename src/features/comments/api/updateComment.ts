import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  id: number
  body: string
}

export const updateComment = async (params: paramsType) => {
  return await apiClient.apiPut('/api/comments', params).then((result) => result)
}
