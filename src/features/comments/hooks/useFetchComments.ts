import useSWR from 'swr'
import { getComments } from '../api'

export const useFetchComments = (pictureId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    getComments(pictureId).then((result) => result),
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
