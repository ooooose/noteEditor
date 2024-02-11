import { apiClient } from '@/lib/axios/api-client'
import { useFetchLikes } from '../hooks/useFetchLikes'
import { Like } from '../types'

type paramsType = {
  email: string
  pictureId: string
}

export const deleteLike = async (params: paramsType) => {
  await apiClient.apiDelete('/api/likes', params)
}

export const useDeleteLike = (params: paramsType) => {
  const { mutate } = useFetchLikes(params.pictureId)
  mutate(deleteLike(params), {
    optimisticData: (likes: Like[]) => likes.filter((like) => like.pictureId !== params.pictureId),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  })

  return { mutate }
}
