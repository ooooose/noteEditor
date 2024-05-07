import { ChangeEvent, useState } from 'react'

import { AuthUser } from '@/features/auth/types'

export const useUpdateUser = (user: AuthUser) => {
  const [username, setUsername] = useState<string>(user.name)
  const [image, setImage] = useState<string>('')
  // TODO: R2にバケット追加（この前作ったものを）
  // TODO: 画像アップロード処理を実装
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

  return {
    image,
    username,
    setUsername,
    previewImage,
    resetInfo,
  }
}
