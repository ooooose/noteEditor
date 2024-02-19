import { useState, useEffect } from 'react'
import { useSWRConfig } from 'swr'

import { postLike, deleteLike } from '../api'
import { Like } from '../types'

export function useMutateLike(pictureId: string, userId: string, likes: Like[]) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { mutate } = useSWRConfig()

  const generateParams = () => {
    const params = {
      userId: userId,
      pictureId: pictureId,
    }
    return params
  }

  useEffect(() => {
    const fetchData = async () => {
      setLikeCount(likes && likes?.length)
      setLiked(!!(likes && likes?.find((like: Like) => like.userId == userId)))
    }
    fetchData()
  }, [setLiked, setLikeCount, likes, userId, pictureId])

  const like = async () => {
    const params = generateParams()
    const newLiked = !liked
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1
    setLiked(newLiked)
    setLikeCount(newLikeCount)
    try {
      if (liked) {
        await deleteLike(params).then((res) => {
          if (res.status === 200) {
            mutate('/api/likes')
          }
        })
      } else {
        await postLike(params).then((res) => {
          if (res.status === 201) {
            mutate('/api/likes')
          }
        })
      }
    } catch (error) {
      console.error('Failed to update like:', error)
    }
  }

  return {
    like,
    liked,
    likeCount,
    mutate,
  }
}
