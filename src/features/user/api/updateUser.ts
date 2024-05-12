import { apiClient } from '@/lib/api/api-client'

export const updateUser = async (params: FormData) => {
  return await apiClient.apiPut('/api/me', params).then((result) => result.json())
}
