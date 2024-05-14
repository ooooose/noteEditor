import { apiClient } from '@/lib/api/api-client'

export const updateUser = async (params: FormData) => {
  return await apiClient.apiPostFormData('/api/profile', params).then((result) => result.json())
}
