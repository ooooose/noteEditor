import useSWR from 'swr'
import { apiClient } from '@/lib/axios/api-client'

export const useFetchThemeById = (id: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/themes/${id}`,
    (endpoint) => apiClient.apiGet(endpoint).then((result) => result.data?.data),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    theme: data?.theme,
    pictures: data?.pictures,
    isLoading: isLoading,
    isError: error,
  }
}
