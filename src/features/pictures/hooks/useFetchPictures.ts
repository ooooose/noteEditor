import useSWR from 'swr'

import { apiClient } from '@/lib/api/api-client'

export const useFetchPictures = (theme: string | undefined) => {
  const encodedTheme = theme ? encodeURIComponent(theme) : ''
  const url = theme ? `/api/pictures?theme=${encodedTheme}` : '/api/pictures'
  const { data, error, isLoading, mutate } = useSWR(
    url,
    () => apiClient.apiGet(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    pictures: data?.pictures,
    isLoading,
    isError: error,
    mutate,
  }
}
