import useSWR from 'swr'
import { apiClient } from '@/lib/axios/api-client'

export const useFetchThemeById = (id: string) => {
  const { data, error, isLoading } = useSWR(
    '/api/themes/${id}',
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
  }
}
