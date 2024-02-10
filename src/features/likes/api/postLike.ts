import { apiClient } from '@/lib/axios/api-client'
import { useFetchLikes } from '../hooks/useFetchLikes'

type paramsType = {
  email: string
  pictureId: string
}

export const postLike = async (params: paramsType) => {
  await apiClient.apiPost('/api/likes', params)
}

export const useCreateLike = async (params: paramsType) => {
  const { likes, mutate } = useFetchLikes(params.pictureId)
  await mutate(postLike(params), {
    optimisticData: [...likes, params],
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  })

  return { mutate }
}
