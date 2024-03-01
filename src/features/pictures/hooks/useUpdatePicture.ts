import { useState } from 'react'
import { toast } from 'sonner'

import { updateFrameId } from '../api/updatePicture'

import { useFetchPictures } from './useFetchPictures'

export const useUpdatePicture = (pictureId: string) => {
  const [frameId, setFrameId] = useState<number>(0)
  const handleSelectChange = (value: string) => {
    const selectedValue = value
    setFrameId(parseInt(selectedValue, 10))
  }

  console.log(pictureId)

  const { mutate } = useFetchPictures()
  const handleUpdateFrameId = () => {
    const params = {
      id: pictureId,
      frameId: frameId,
    }
    try {
      updateFrameId(params).then((res) => {
        if (res.status === 200) {
          mutate()
          toast('絵を削除しました', { position: 'top-center' })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return {
    frameId,
    handleSelectChange,
    handleUpdateFrameId,
  }
}
