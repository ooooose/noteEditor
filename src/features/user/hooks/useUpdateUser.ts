import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { AuthUser } from '@/features/auth/types'

import { updateUser } from '../api/updateUser'

export const useUpdateUser = (user: AuthUser) => {
  const [username, setUsername] = useState<string>(user.name)
  const [image, setImage] = useState<string>('')
  const { isLoading, mutate } = useFetchAuthUserByEmail()

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
  const onUpdate = async (body: { name: string; image: File }) => {
    const formData = new FormData()

    formData.append('id', user.id)
    formData.append('name', body.name)
    formData.append('image', body.image)
    console.log(body)
    // formDataに何も格納されていない（）
    console.log(formData)
    try {
      await updateUser(formData)
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
    isLoading,
  }
}
