// import { UpdateIcon } from '@radix-ui/react-icons'
// import { memo } from 'react'

// import { Button } from '@/components/elements/Button'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from '@/components/ui/dialog'

// import { useUpdatePicture } from '../../hooks/useUpdatePicture'
// import { FrameSelect } from '../Frames/FrameSelect'
// import { Picture } from '../Picture'

// type SwitchPictureFrameProps = {
//   pictureId: string
//   src: string
//   author: string
// }

// const SwitchPictureFrame = memo(({ pictureId, src, author }: SwitchPictureFrameProps) => {
//   const { frameId, handleSelectChange, handleUpdateFrameId } = useUpdatePicture(pictureId)
//   return (
//     <Dialog>
//       <DialogTrigger className='py-2'>
//         <UpdateIcon className='size-5' />
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>フレームを変更できます</DialogTitle>
//         </DialogHeader>
//         <div className='mx-auto flex w-[240px] flex-col gap-4'>
//           <Picture author={author} frameId={frameId} src={src} />
//           <FrameSelect handleSelectChange={handleSelectChange} />
//         </div>
//         <DialogClose asChild>
//           <Button className='mt-3 w-full' onClick={handleUpdateFrameId} variant='outline'>
//             登録する
//           </Button>
//         </DialogClose>
//       </DialogContent>
//     </Dialog>
//   )
// })

// export default SwitchPictureFrame
// SwitchPictureFrame.displayName = 'SwitchPictureFrame'
