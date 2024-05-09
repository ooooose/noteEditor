import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { AuthUser } from '@/features/auth/types'

import { updateUser } from '../api/updateUser'

export const useUpdateUser = (user: AuthUser) => {
  const [username, setUsername] = useState<string>(user.name)
  const [image, setImage] = useState<string>('')
  const { mutate } = useFetchAuthUserByEmail()

  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(window.URL.createObjectURL(file))
    }
  }

  const resetInfo = () => {
    setUsername(user.name)
    setImage('')
  }
  // アップデート処理を実装
  const onUpdate = async (body: any) => {
    const params = {
      id: user.id,
      name: body.name,
      image: body.image ?? undefined,
    }

    try {
      await updateUser(params)
      mutate()
      toast('プロフィールを更新しました', { position: 'top-center' })
    } catch (err) {
      console.error(err)
    }
  }

  return {
    image,
    username,
    setUsername,
    previewImage,
    resetInfo,
    onUpdate,
  }
}
