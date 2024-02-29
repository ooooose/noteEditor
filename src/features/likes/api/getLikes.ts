import { apiClient } from '@/lib/api/api-client'

export const getLikes = async () => {
  await apiClient.apiGet('/api/likes')
}
