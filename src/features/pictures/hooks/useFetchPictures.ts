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
const LIMIT = 9

export const useFetchPictures = (theme?: string): SWRPictureStore => {
  const encodedTheme = theme ? encodeURIComponent(theme) : ''
  const params = []
  if (theme) params.push(`theme=${encodedTheme}`)
  const url = joinUrl(API_URL, params)

  const getKey = (pageIndex: number, previousPageData: Picture[]) => {
    if (previousPageData && !previousPageData.length) return null

    return [url, pageIndex, LIMIT]
  }

  const fetcher = async () => {
    return apiClient.apiGet(url).then((res) => res.json())
  }

  const {
    data: picturesList,
    error,
    isLoading,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const loadMorePictures = () => {
    setSize(size + 1)
  }

  const isLast = picturesList
    ? picturesList.filter((list) => list.pictures.length < LIMIT).length > 0
    : false

  const pictures = picturesList ? picturesList.flatMap((list) => list.pictures) : null

  return {
    pictures,
    isLast,
    error,
    isLoading,
    mutate,
    loadMorePictures,
  }
}
