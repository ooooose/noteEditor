import { apiClient } from '@/lib/api/api-client'

type paramsType = {
  userId: string
  userName: string
  pictureId: string
  body: string
}

export const postComment = async (params: paramsType) => {
  return await apiClient.apiPost('/api/comments', params).then((result) => result.json())
}
