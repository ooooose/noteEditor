import { useState } from 'react'

export const useUpdatePicture = (pictureId: string) => {
  const [frameId, setFrameId] = useState<number>(0)
  const handleSelectChange = (value: string) => {
    const selectedValue = value
    setFrameId(parseInt(selectedValue, 10))
  }

  console.log(pictureId)

  return {
    frameId,
    handleSelectChange,
  }
}
