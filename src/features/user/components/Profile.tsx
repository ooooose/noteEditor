import Image from 'next/image'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { AuthUser } from '@/features/auth/types'

import EditProfileModal from './EditProfileModal'

type ProfileProps = {
  user: AuthUser
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className='mx-auto flex flex-col gap-3'>
      <Dialog>
        <DialogTrigger asChild>
          <Image
            alt='avatar'
            className='mx-auto rounded-full'
            height={70}
            src={user.image ?? '/avatar.png'}
            width={70}
          />
        </DialogTrigger>
        <EditProfileModal />
      </Dialog>
      <p className='pb-2 text-center'>{user.name} さん</p>
    </div>
  )
}

export default Profile
