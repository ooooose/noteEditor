import { useCallback } from 'react'
import { KeyedMutator } from 'swr'
import useSWRInfinite from 'swr/infinite'

import { apiClient } from '@/lib/api/api-client'
import { joinUrl } from '@/utils/joinUrl'

import { Picture } from '../types'

interface SWRPictureStore {
  pictures: Picture[] | null
  isLast: boolean
  error: Error
  isLoading: boolean
  mutate: KeyedMutator<Picture[][]>
  loadMorePictures: () => void
}

const API_URL = '/api/pictures'

export const useFetchPictures = (theme?: string): SWRPictureStore => {
  const encodedTheme = theme ? encodeURIComponent(theme) : ''
  const params: string[] = []
  if (theme) params.push(`theme=${encodedTheme}`)

  const getKey = (pageIndex: number, previousPageData: Picture[][]) => {
    if (previousPageData && !previousPageData.length) return null
    params.push(`page=${pageIndex + 1}`)
    return joinUrl(API_URL, params)
  }

  const fetcher = useCallback(async (url: string) => {
    return apiClient.apiGet(url).then((res) => res.json())
  }, [])

  const { data, error, isLoading, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const loadMorePictures = () => {
    setSize(size + 1)
  }

  const isLast = data?.[0]?.length === 0

  const pictures = data ? data.flatMap((list) => list.pictures) : null

  return {
    pictures,
    isLast,
    error,
    isLoading,
    mutate,
    loadMorePictures,
  }
}
