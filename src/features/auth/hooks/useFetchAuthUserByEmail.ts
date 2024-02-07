import useSWR from 'swr'
import { apiClient } from '@/lib/axios/api-client'

export const useFetchAuthUserByEmail = (email: string) => {
  const params = {
    email: email,
  }
  const { data, error, isLoading } = useSWR(
    '/api/me',
    (endpoint) => apiClient.apiPost(endpoint, params).then((result) => result.data.user),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    user: data,
    isLoading: isLoading,
    isError: error,
  }
}
