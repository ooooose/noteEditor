import useSWR from 'swr'

import { getComments } from '../api'

export const useFetchComments = () => {
  const fetchComments = async () => {
    const result = await getComments()
    return result.json()
  }

  const {
    data: comments,
    error,
    isValidating: isLoading,
    mutate,
  } = useSWR('/api/comments', fetchComments, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    comments,
    isLoading,
    isError: error,
    mutate,
  }
}
