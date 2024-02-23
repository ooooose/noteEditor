import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

export const useFetchThemeById = (id: string) => {
  const {
    data,
    error,
    isValidating: isLoading,
  } = useSWR(
    `/api/themes/${id}`,
    (endpoint) => apiClient.apiGet(endpoint).then((result) => result.data?.theme),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    theme: data,
    isLoading,
    isError: error,
  }
}
