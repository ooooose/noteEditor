import { useState, useCallback, useEffect } from 'react'

import { useCreateLike, useDeleteLike } from '../api'

import type { Like } from '../types'

export function useMutateLike(pictureUid: string, userId: number, likes: Like[]) {
  const [liked, setLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(likes.length)

  useEffect(() => {
    const fetchData = async () => {
      if (likes) {
        setLikeCount(likes?.length)
        setLiked(!!likes?.find((like: Like) => like.userId == userId))
      }
    }
    fetchData()
  }, [setLiked, setLikeCount, likes, userId])

  const createLikeMutation = useCreateLike({
    mutationConfig: {
      onError: (error) => {
        console.error('Failed to update like:', error)
      },
    },
  })

  const deleteLikeMutation = useDeleteLike({
    mutationConfig: {
      onError: (error) => {
        console.error('Failed to update like:', error)
      },
    },
  })

  const like = useCallback(async () => {
    const newLiked = !liked
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1
    try {
      if (liked) {
        deleteLikeMutation.mutate({
          picture_uid: pictureUid,
        })
      } else {
        createLikeMutation.mutate({
          picture_uid: pictureUid,
        })
      }
    } catch (error) {
      console.error('Failed to update like:', error)
    }
    setLiked(newLiked)
    setLikeCount(newLikeCount)
  }, [pictureUid, liked, likeCount, deleteLikeMutation, createLikeMutation])

  return {
    like,
    liked,
    likeCount,
  }
}
