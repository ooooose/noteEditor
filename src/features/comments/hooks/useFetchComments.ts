import useSWR from 'swr'
import { getComments } from '../api'
import { apiClient } from '@/lib/axios/api-client'

export const useFetchComments = () => {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/comments',
    () => getComments().then((result) => result.data.comments),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  return {
    comments: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
