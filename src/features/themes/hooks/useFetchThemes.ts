import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

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
    isLoading,
    isError: error,
    mutate,
  }
}
