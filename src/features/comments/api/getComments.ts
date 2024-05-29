import { apiClient } from '@/lib/api/api-client'

export const getComments = async (url: string) => {
  return apiClient.apiGet(url).then((res) => res.json())
}
