import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

export const useFetchThemeById = (id: string) => {
  const {
    data,
    error,
    isValidating: isLoading,
  } = useSWR(
    `/api/themes/${id}`,
    () => apiClient.apiGet(`/api/themes/${id}`).then((result) => result.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    theme: data?.theme,
    isLoading,
    isError: error,
  }
}
