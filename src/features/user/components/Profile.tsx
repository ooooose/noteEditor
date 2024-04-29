import Image from 'next/image'

import { AuthUser } from '@/features/auth/types'

type ProfileProps = {
  user: AuthUser
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className='mx-auto flex flex-col gap-3'>
      <Image
        alt='avatar'
        className='mx-auto rounded-full'
        height={70}
        src={user.image ?? '/avatar.png'}
        width={70}
      />
      <p className='pb-2 text-center'>{user.name} さん</p>
    </div>
  )
}

export default Profile
