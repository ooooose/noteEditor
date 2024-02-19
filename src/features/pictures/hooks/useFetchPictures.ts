import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

export const useFetchPictures = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/pictures',
    (endpoint) => apiClient.apiGet(endpoint).then((result) => result.data?.pictures),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  return {
    pictures: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
