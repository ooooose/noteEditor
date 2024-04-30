import Image from 'next/image'
import React from 'react'

type AvatarProps = {
  src: string | undefined
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ src }: AvatarProps, ref) => {
  const avatar = src ?? '/avatar.png'
  return (
    <div ref={ref}>
      <Image
        alt='avatar'
        className='mx-auto cursor-pointer rounded-full hover:opacity-80'
        height={70}
        src={avatar}
        width={70}
      />
    </div>
  )
})

export default Avatar
Avatar.displayName = 'Avagtar'
