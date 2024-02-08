import { useState } from 'react'
import { apiClient } from '@/lib/axios/api-client'
import { useSession } from 'next-auth/react'
import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { useToast } from '@/components/ui/use-toast'
import { Like } from '../types'

export function useMutateLike(pictureId: string) {
  const { data: session } = useSession()
  const { user: authUser } = useFetchAuthUserByEmail(session?.user.email ?? '')
  const isLike = authUser && authUser.likes.find((like: Like) => like.pictureId === pictureId)
  const { toast } = useToast()
  const generateParams = () => {
    const params = {
      email: session?.user.email ?? '',
      pictureId: pictureId,
    }
    return params
  }

  const { mutate, isLoading } = useFetchAuthUserByEmail(session?.user.email ?? '')

  const handleLike = async () => {
    const params = generateParams()
    await apiClient.apiPost('/api/likes', params).then((res) => {
      if (res.status === 201) {
        mutate()
      } else if (res.status === 500) {
        toast({
          description: 'いいねに失敗しました',
          variant: 'destructive',
        })
      }
    })
  }

  const handleUnlike = async () => {
    const params = generateParams()
    await apiClient.apiDelete('/api/likes', params).then((res) => {
      if (res.status === 200) {
        mutate()
      } else if (res.status === 500) {
        toast({
          description: 'いいね解除に失敗しました',
          variant: 'destructive',
        })
      }
    })
  }

  const like = () => {
    if (isLike) {
      handleUnlike()
    } else {
      handleLike()
    }
  }

  return {
    like,
    isLoading,
    isLike,
  }
}
