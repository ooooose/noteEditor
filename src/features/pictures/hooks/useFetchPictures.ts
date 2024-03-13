import { useCallback, useMemo } from 'react'
import { KeyedMutator } from 'swr'
import useSWRInfinite from 'swr/infinite'

import { apiClient } from '@/lib/api/api-client'

import { Picture } from '../types'

interface SWRPictureStore {
  pictures: Picture[] | null
  isLast: boolean
  error: Error
  isLoading: boolean
  mutate: KeyedMutator<Picture[][]>
  loadMorePictures: () => void
}

const LIMIT = 3

export const useFetchPictures = (theme?: string): SWRPictureStore => {
  const API_URL = `/api/pictures?theme=${theme ?? ''}`
  const getKey = (pageIndex: number, previousPageData: Picture[][]) => {
    if (!previousPageData) return `${API_URL}&page=1`

    const lastPageIndex = previousPageData.length - 1
    if (pageIndex > lastPageIndex) return null

    return `${API_URL}&page=${pageIndex + 1}`
  }

  const fetcher = useCallback(async (url: string) => {
    return apiClient.apiGet(url).then((res) => res.json())
  }, [])

  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateFirstPage: false,
  })

  const loadMorePictures = useCallback(() => {
    setSize(size + 1)
  }, [setSize, size])

  const mergedData = useMemo(() => {
    if (!data) return []

    return data.flatMap((page) => page.pictures)
  }, [data])

  return {
    pictures: mergedData,
    isLast: data ? data.filter((list) => list.pictures.length < LIMIT).length > 0 : false,
    error,
    isLoading: !data ? isValidating : false,
    mutate,
    loadMorePictures,
  }
}
