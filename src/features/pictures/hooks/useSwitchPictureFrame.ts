import { useState } from 'react'
import { toast } from 'sonner'

import { useUpdatePicture } from '../api'
import { Picture } from '../types'

type SwitchPictureFrameProps = {
  picture: Picture
}

export const useSwitchPictureFrame = ({ picture }: SwitchPictureFrameProps) => {
  const [frameId, setFrameId] = useState<number>(picture.frameId)

  const handleUpdateFrameId = () => {
    setFrameId(picture.frameId)
  }

  const updatePictureMutation = useUpdatePicture({
    mutationConfig: {
      onSuccess: () => toast.success('フレームを変更しました'),
      onError: () => toast.error('フレームの変更に失敗しました'),
    },
  })

  return {
    frameId,
    handleUpdateFrameId,
    updatePictureMutation,
  }
}
