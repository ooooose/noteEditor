import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { apiClient } from '@/lib/axios/api-client'

export const useFetchAuthUserByEmail = () => {
  const { data: session } = useSession()
  const email = session && session?.user.email
  const params = {
    email: email,
  }
  const { data, error, isLoading, mutate } = useSWR(
    '/api/me',
    () => apiClient.apiPost('/api/me', params).then((result) => result.json()),
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
    mutate: mutate,
  }
}
