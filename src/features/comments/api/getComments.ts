import { apiClient } from '@/lib/api/api-client'

export const getComments = () => {
  return apiClient.apiGet('/api/comments')
}
