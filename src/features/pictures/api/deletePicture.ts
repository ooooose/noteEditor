import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  id: string
}

export const deletePicture = async (params: paramsType) => {
  return await apiClient.apiDelete('/api/pictures', params).then((result) => result)
}
