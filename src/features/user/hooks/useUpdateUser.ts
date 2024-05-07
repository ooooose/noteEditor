import { ChangeEvent, useState } from 'react'

export const useUpdateUser = () => {
  const [image, setImage] = useState<string>('')
  // TODO: R2にバケット追加（この前作ったものを）
  // TODO: 画像アップロード処理を実装
  const [name, setName] = useState<string>('')
  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(window.URL.createObjectURL(file))
    }
  }

  const resetInfo = () => {
    setName('')
    setImage('')
  }
  // アップデート処理を実装

  return {
    image,
    name,
    setName,
    previewImage,
    resetInfo,
  }
}
