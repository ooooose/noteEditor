import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  id: string
  name: string
  image: string
}

export const updateUser = async (params: paramsType) => {
  return await apiClient.apiPut('/api/me', params).then((result) => result.json())
}
