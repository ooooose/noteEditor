import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

export const useFetchThemes = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/themes',
    (endpoint) => apiClient.apiGet(endpoint).then((result) => result.data?.themes),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  return {
    themes: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
