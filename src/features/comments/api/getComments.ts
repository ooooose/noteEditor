import { apiClient } from '@/lib/axios/api-client'

export const getComments = () => {
  return apiClient.apiGet('/api/comments')
}
