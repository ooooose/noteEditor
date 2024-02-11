import useSWR from 'swr'
import { getComments } from '../api'

export const useFetchLikes = (pictureId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    getComments(pictureId).then((result) => result),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  return {
    likes: data,
    isLoading: isLoading,
    isError: error,
    mutate: mutate,
  }
}
