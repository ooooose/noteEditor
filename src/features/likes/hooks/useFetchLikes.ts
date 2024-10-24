// import useSWR from 'swr'

// import { apiClient } from '@/lib/api/api-client'

// const fetchLikes = async () => {
//   const result = await apiClient.apiGet('/api/likes')
//   return result.json()
// }

// export const useFetchLikes = () => {
//   const { data, error, isLoading, mutate } = useSWR('/api/likes', fetchLikes, {
//     revalidateIfStale: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//   })

//   return {
//     likes: data?.likes,
//     isLoading,
//     isError: error,
//     mutate,
//   }
// }
