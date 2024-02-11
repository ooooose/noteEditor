import { apiClient } from '@/lib/axios/api-client'

export const getComments = async () => {
  return await apiClient.apiGet('/api/comments')
}
