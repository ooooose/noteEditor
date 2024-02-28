import useSWR from 'swr'

import { apiClient } from '@/lib/api/api-client'

const fetchComments = async () => {
  const result = await apiClient.apiGet('/api/comments')
  return result.json()
}

export const useFetchComments = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/comments', fetchComments, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    comments: data?.comments,
    isLoading,
    isError: error,
    mutate,
  }
}
