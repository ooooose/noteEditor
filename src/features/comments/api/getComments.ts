import { apiClient } from '@/lib/axios/api-client'

export const getComments = async (pictureId: string) => {
  const params = {
    pictureId: pictureId,
  }
  await apiClient.apiGet('/api/comments').then((res) => {
    return res.data.comments
  })
}
