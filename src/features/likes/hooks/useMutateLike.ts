import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useFetchLikes } from './useFetchLikes'
import { Like } from '../types'
import { postLike } from '../api/postLike'
import { deleteLike } from '../api/deleteLike'

export function useMutateLike(pictureId: string) {
  const { data: session } = useSession()
  const { user: authUser } = useFetchAuthUserByEmail(session?.user.email ?? '')
  const { likes, mutate, isLoading } = useFetchLikes(pictureId)
  const isLike =
    likes && likes?.find((like: Like) => like.userId == authUser?.id && like.pictureId == pictureId)
  const Likes = (likes && likes?.filter((like: Like) => like.pictureId === pictureId).length) || 0
  const generateParams = () => {
    const params = {
      email: session?.user.email ?? '',
      pictureId: pictureId,
    }
    return params
  }

  const like = async () => {
    const params = generateParams()
    if (isLike) {
      await mutate(deleteLike(params), {
        optimisticData: (likes: Like[]) =>
          likes.filter((like) => like.pictureId !== params.pictureId),
      })
    } else {
      await mutate(postLike(params), {
        optimisticData: [...likes, params],
      })
    }
  }

  return {
    like,
    isLoading,
    isLike,
    Likes,
  }
}
