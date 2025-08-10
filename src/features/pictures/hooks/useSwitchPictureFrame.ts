import { useState } from 'react'
import { toast } from 'sonner'

import { useSwitchFrame } from '../api'
import { Picture } from '../types'

type SwitchPictureFrameProps = {
  picture: Picture
}

export const useSwitchPictureFrame = ({ picture }: SwitchPictureFrameProps) => {
  const [frameId, setFrameId] = useState<number>(picture.frameId)

  const handleUpdateFrameId = (frameId: string) => {
    // NOTE: SelectのonChangeに設定するvalueがstringで定義されているので一旦stringで受けてnumberにキャスト
    // https://github.com/shadcn-ui/ui/issues/772
    setFrameId(Number(frameId))
  }

  const switchPictureFrameMutation = useSwitchFrame({
    mutationConfig: {
      onSuccess: () => {
        toast.success('フレームを変更しました')
      },
      onError: () => {
        toast.error('フレームの変更に失敗しました')
      },
    },
  })

  return {
    frameId,
    handleUpdateFrameId,
    switchPictureFrameMutation,
  }
}
