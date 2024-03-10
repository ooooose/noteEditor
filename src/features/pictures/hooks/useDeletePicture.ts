import { toast } from 'sonner'
import { useSWRConfig } from 'swr'

import { deletePicture } from '../api'

export const useDeletePicture = () => {
  const { mutate } = useSWRConfig()
  const handleDeletePicture = (pictureId: string, image: string) => {
    const params = {
      id: pictureId,
      image: image,
    }
    try {
      deletePicture(params).then(() => {
        mutate('/api/pictures')
        toast('絵を削除しました', { position: 'top-center' })
      })
    } catch (err) {
      console.log(err)
    }
  }

  return { handleDeletePicture }
}
