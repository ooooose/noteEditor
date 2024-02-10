import { apiClient } from '@/lib/axios/api-client'

export const getLikes = async () => {
  await apiClient.apiGet('/api/likes')
}
