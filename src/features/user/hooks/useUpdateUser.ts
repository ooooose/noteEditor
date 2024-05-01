import { ChangeEvent, useState } from 'react'

export const useUpdateUser = () => {
  const [preview, setPreview] = useState<string>('')
  // TODO: R2にバケット追加（この前作ったものを）
  // TODO: 画像アップロード処理を実装
  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setPreview(window.URL.createObjectURL(file))
    }
  }

  const reset = () => {
    setPreview('')
  }
  // アップデート処理を実装

  return {
    preview,
    setPreview,
    previewImage,
    reset,
  }
}
