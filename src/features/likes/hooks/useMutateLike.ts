import { useState, useEffect, useCallback } from 'react'
import { useSWRConfig } from 'swr'

import { postLike, deleteLike } from '../api'
import { Like } from '../types'

export function useMutateLike(pictureId: string, userId: string, likes: Like[]) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { mutate } = useSWRConfig()

  useEffect(() => {
    const fetchData = async () => {
      if (likes) {
        setLikeCount(likes?.length)
        setLiked(!!likes?.find((like: Like) => like.userId == userId))
      }
    }
    fetchData()
  }, [setLiked, setLikeCount, likes, userId, pictureId])

  const like = useCallback(async () => {
    const params = {
      userId: userId,
      pictureId: pictureId,
    }
    const newLiked = !liked
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1
    setLiked(newLiked)
    setLikeCount(newLikeCount)
    try {
      if (liked) {
        await deleteLike(params)
      } else {
        await postLike(params)
      }
    } catch (error) {
      console.error('Failed to update like:', error)
    } finally {
      mutate('/api/likes')
    }
  }, [liked, likeCount, pictureId, userId, mutate])

  return {
    like,
    liked,
    likeCount,
  }
}
