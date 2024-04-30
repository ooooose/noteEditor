import Image from 'next/image'
import { memo } from 'react'

type AvatarProps = {
  src: string | undefined
}

const Avatar = memo(({ src }: AvatarProps) => {
  const avatar = src ?? '/avatar.png'
  return (
    <Image
      alt='avatar'
      className='mx-auto cursor-pointer rounded-full hover:opacity-80'
      height={70}
      src={avatar}
      width={70}
    />
  )
})

export default Avatar
Avatar.displayName = 'Avagtar'
