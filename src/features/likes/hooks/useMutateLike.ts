import { apiClient } from '@/lib/axios/api-client'
import { useSession } from 'next-auth/react'
import { useFetchLikes } from './useFetchLikes'
import { useToast } from '@/components/ui/use-toast'

export function useMutateLike(pictureId: string) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const generateParams = () => {
    const params = {
      email: session?.user.email ?? '',
      pictureId: pictureId,
    }
    return params
  }

  const { mutate } = useFetchLikes()

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
        console.log('成功！')
        mutate()
      } else if (res.status === 500) {
        toast({
          description: 'いいね解除に失敗しました',
          variant: 'destructive',
        })
      }
    })
  }

  return {
    handleLike,
    handleUnlike,
  }
}
