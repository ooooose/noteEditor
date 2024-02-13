import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  id: number
  body: string
}

export const updateComment = async (params: paramsType) => {
  await apiClient.apiPut('/api/comments', params)
}
