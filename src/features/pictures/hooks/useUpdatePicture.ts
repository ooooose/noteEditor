// import { useState, useCallback } from 'react'
// import { toast } from 'sonner'

// import { updateFrameId } from '../api'

// import { useFetchPictures } from './useFetchPictures'

// export const useUpdatePicture = (pictureId: string) => {
//   const [frameId, setFrameId] = useState<number>(0)
//   const handleSelectChange = (value: string) => {
//     const selectedValue = value
//     setFrameId(parseInt(selectedValue, 10))
//   }

//   const { mutate } = useFetchPictures()
//   const handleUpdateFrameId = useCallback(async () => {
//     const params = {
//       id: pictureId,
//       frameId: frameId,
//     }
//     try {
//       await updateFrameId(params)
//       mutate()
//       toast('額縁を変更しました', { position: 'top-center' })
//     } catch (err) {
//       console.log(err)
//     }
//   }, [frameId, mutate, pictureId])

//   return {
//     frameId,
//     handleSelectChange,
//     handleUpdateFrameId,
//   }
// }
