import useSWR from 'swr'

import { apiClient } from '@/lib/api/api-client'

const fetchThemes = async () => {
  const result = await apiClient.apiGet('/api/themes')
  return result.json()
}

export const useFetchThemes = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/themes', fetchThemes, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    themes: data?.themes,
    randomTheme: data?.randomTheme,
    isLoading,
    isError: error,
    mutate,
  }
}
