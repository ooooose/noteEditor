import { useCallback } from 'react'
import { toast } from 'sonner'

import { deletePicture } from '../api'

import { useFetchPictures } from './useFetchPictures'

export const useDeletePicture = () => {
  const { mutate } = useFetchPictures()
  const handleDeletePicture = useCallback(
    (pictureId: string, image: string) => {
      const params = {
        id: pictureId,
        image: image,
      }
      try {
        deletePicture(params).then((res) => {
          if (res.status === 200) {
            mutate()
            toast('絵を削除しました', { position: 'top-center' })
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    [mutate],
  )

  return { handleDeletePicture }
}
