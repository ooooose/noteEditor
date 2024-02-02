import useSWR from 'swr'
import { apiClient } from '@/lib/axios/api-client'

type PictureDataType = {
  image: FormData
  email: string
  themeId: string
}

export const useMutatePicture = (params: PictureDataType) => {
  const { data, error, isLoading } = useSWR(
    '/pictures',
    (endpoint) => apiClient.apiPost(endpoint, params).then((result) => result.data?.picture),
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
