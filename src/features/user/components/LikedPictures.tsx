// import { memo } from 'react'

// import Pictures from '@/features/pictures/components/Pictures'

// import { useFetchUserLikedPictures } from '../hooks/useFetchUserLikedPictures'

// import type { User } from '../types'

// type LikedPicturesProps = {
//   user: User
// }

// const LikedPictures = memo(({ user }: LikedPicturesProps) => {
//   const {
//     pictures,
//     isLoading: isPicturesLoading,
//     error,
//     size,
//   } = useFetchUserLikedPictures(user.id)

//   const isLoading = isPicturesLoading
//   if (error) return <>Error loading theme</>
//   const height = `h-[${size * 600}px] mt-5`
//   return (
//     <div className={height}>
//       <Pictures
//         isLoading={isLoading}
//         pictures={pictures}
//       />
//     </div>
//   )
// })

// export default LikedPictures
// LikedPictures.displayName = 'LikedPictures'
