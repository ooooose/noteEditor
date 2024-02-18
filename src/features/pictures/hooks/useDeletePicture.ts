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
      deletePicture(params).then((res) => {
        if (res.status === 200) {
          toast('絵を削除しました', { position: 'top-center' })
          mutate()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return { handleDeletePicture }
}
