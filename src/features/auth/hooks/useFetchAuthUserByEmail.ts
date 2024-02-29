import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import useSWR from 'swr'

import { apiClient } from '@/lib/api/api-client'

export const useFetchAuthUserByEmail = () => {
  const { data: session } = useSession()

  const email = session?.user?.email

  const params = {
    email: email,
  }

  // Ensure that useSWR is called unconditionally
  const { data, error, isLoading, mutate } = useSWR(
    '/api/me',
    () => apiClient.apiPost('/api/me', params).then((result) => result.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (email) {
      mutate()
    }
  }, [email, mutate])

  return {
    user: data?.user,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
