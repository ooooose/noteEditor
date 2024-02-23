import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

const fetchPictures = async () => {
  const result = await apiClient.apiGet('/api/pictures')
  return result.data?.pictures
}

export const useFetchPictures = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/pictures', fetchPictures, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    pictures: data,
    isLoading,
    isError: error,
    mutate,
  }
}
