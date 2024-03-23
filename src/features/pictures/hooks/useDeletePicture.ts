import { toast } from 'sonner'

import { deletePicture } from '../api'

import { useFetchPictures } from './useFetchPictures'

export const useDeletePicture = () => {
  const { mutate } = useFetchPictures()
  const handleDeletePicture = (pictureId: string, image: string) => {
    const params = {
      id: pictureId,
      image: image,
    }
    try {
      deletePicture(params).then(() => {
        mutate()
        toast('絵を削除しました', { position: 'top-center' })
      })
    } catch (err) {
      console.log(err)
    }
  }

  return { handleDeletePicture }
}
