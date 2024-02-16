import { apiClient } from '@/lib/axios/api-client'

type paramsType = {
  email: string
  pictureId: string
  body: string
}

export const postComment = async (params: paramsType) => {
  return await apiClient.apiPost('/api/comments', params).then((result) => result)
}
