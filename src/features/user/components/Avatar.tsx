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
        className='mx-auto size-[100px] cursor-pointer rounded-full hover:opacity-80'
        height={100}
        src={avatar}
        width={100}
      />
    </div>
  )
})

export default Avatar
Avatar.displayName = 'Avagtar'
