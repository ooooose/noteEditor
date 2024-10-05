// 'use client'

// import { DotsVerticalIcon, TwitterLogoIcon, DownloadIcon } from '@radix-ui/react-icons'
// import { memo } from 'react'

// import { Tooltip } from '@/components/elements/Tooltip/Tooltip'
// import { Button } from '@/components/ui/button'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'

// import DeletePicture from './menu/DeletePicture'
// import SwitchPictureFrame from './menu/SwitchPictureFrame'

// import type { Picture } from '../types'

// type PictureMenuProps = {
//   picture: Picture
// }

// const PictureMenu = memo(({ picture }: PictureMenuProps) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className='h-[65px] focus:outline-none'>
//         <DotsVerticalIcon />
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align='end' className='flex' side='bottom'>
//         <Tooltip content='Xシェア'>
//           <DropdownMenuItem className='cursor-pointer'>
//             <TwitterLogoIcon className='size-5' />
//           </DropdownMenuItem>
//         </Tooltip>
//         <Tooltip content='ダウンロード'>
//           <DropdownMenuItem className='cursor-pointer'>
//             <DownloadIcon className='size-5' />
//           </DropdownMenuItem>
//         </Tooltip>
//         <Tooltip content='額縁を変更'>
//           <Button className='border-none p-2' variant='outline'>
//             <SwitchPictureFrame
//               author={picture.author}
//               pictureId={picture.id}
//               src={picture.image}
//             />
//           </Button>
//         </Tooltip>
//         <Tooltip content='絵を削除'>
//           <Button className='border-none p-2' variant='outline'>
//             <DeletePicture image={picture.image} pictureId={picture.id} />
//           </Button>
//         </Tooltip>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// })

// export default PictureMenu
// PictureMenu.displayName = 'PictureMenu'
