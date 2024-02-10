import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchLikes } from './useFetchLikes'
import { Like } from '../types'
import { postLike } from '../api/postLike'
import { deleteLike } from '../api/deleteLike'

export function useMutateLike(pictureId: string) {
  const { data: session } = useSession()

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user: authUser } = useFetchAuthUserByEmail(session?.user.email ?? '')
  const { likes, isLoading } = useFetchLikes(pictureId)
  const generateParams = () => {
    const params = {
      email: session?.user.email ?? '',
      pictureId: pictureId,
    }
    return params
  }

  useEffect(() => {
    !isLoading &&
      setLikeCount(
        (likes && likes?.filter((like: Like) => like.pictureId === pictureId).length) || 0,
      )
    !isLoading &&
      setLiked(
        likes?.find((like: Like) => like.userId == authUser?.id && like.pictureId == pictureId),
      )
  }, [isLoading, setLiked, setLikeCount])

  const like = async () => {
    const params = generateParams()
    const newLiked = !liked
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1
    setLiked(newLiked)
    setLikeCount(newLikeCount)
    if (liked) {
      await deleteLike(params)
    } else {
      await postLike(params)
    }
  }

  return {
    like,
    isLoading,
    liked,
    likeCount,
  }
}
