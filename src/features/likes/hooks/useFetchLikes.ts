import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

export const useFetchLikes = (pictureId: string) => {
  const params = {
    pictureId: pictureId,
  }
  const { data, error, isLoading, mutate } = useSWR(
    `/api/likes`,
    (endpoint) => apiClient.apiGet(endpoint, params).then((result) => result.data?.likes),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  return {
    likes: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
