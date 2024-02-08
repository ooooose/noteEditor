import useSWR from 'swr'
import { apiClient } from '@/lib/axios/api-client'

export const useFetchPictureById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/pictures/${id}`,
    (endpoint) => apiClient.apiGet(endpoint).then((result) => result.data?.picture),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    picture: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
