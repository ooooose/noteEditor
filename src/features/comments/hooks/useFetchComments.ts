import useSWR from 'swr'

import { getComments } from '../api'

export const useFetchComments = (pictureId: string) => {
  const url = `/api/comments/${pictureId}`
  const { data, error, isLoading, mutate } = useSWR(url, (url) => getComments(url), {
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
