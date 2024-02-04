import useSWR from 'swr'
import { apiClient } from '@/lib/axios/api-client'

export const useFetchAuthUserByEmail = (email: string | undefined) => {
  const params = {
    email: email,
  }
  const { data, error, isLoading } = useSWR(
    '/api/me',
    (endpoint) => apiClient.apiPost(endpoint, params).then((result) => result.data?.user),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    authUser: data,
    isLoading: isLoading,
    isError: error,
  }
}
