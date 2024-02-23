import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

const fetchLikes = async () => {
  const result = await apiClient.apiGet('/api/likes')
  return result.data?.likes
}

export const useFetchLikes = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/likes', fetchLikes, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    likes: data,
    isLoading,
    isError: error,
    mutate,
  }
}
