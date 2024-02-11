import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchLikes } from './useFetchLikes'
import { Like } from '../types'
import { postLike, deleteLike } from '../api'

export function useMutateLike(pictureId: string) {
  const { data: session } = useSession()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user: authUser } = useFetchAuthUserByEmail(session?.user.email ?? '')
  const { likes, isLoading, mutate } = useFetchLikes(pictureId)

  const generateParams = () => {
    const params = {
      email: session?.user.email ?? '',
      pictureId: pictureId,
    }
    return params
  }

  useEffect(() => {
    const fetchData = async () => {
      await likes
      setLikeCount(
        (likes && likes?.filter((like: Like) => like.pictureId === pictureId).length) || 0,
      )
      setLiked(
        likes &&
          likes?.find((like: Like) => like.userId == authUser?.id && like.pictureId == pictureId),
      )
    }
    if (!isLoading) {
      fetchData()
    }
  }, [isLoading, setLiked, setLikeCount, likes, authUser?.id, pictureId])

  const like = async () => {
    const params = generateParams()
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
    }
  }

  return {
    like,
    isLoading: isLoading,
    liked,
    likeCount,
    mutate,
  }
}
