import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

import { AuthUser } from '@/features/auth/types'

import Avatar from './Avatar'
import EditProfileModal from './EditProfileModal'

type ProfileProps = {
  user: AuthUser
  isLoading: boolean
}

const Profile = ({ user, isLoading }: ProfileProps) => {
  if (isLoading)
    return (
      <div className='mx-auto flex flex-col gap-3'>
        <Skeleton className='mx-auto size-[70px] rounded-full' />
        <Skeleton className='mx-auto h-[40px] w-[140px] pb-2' />
      </div>
    )
  return (
    <div className='mx-auto flex flex-col gap-3'>
      <Dialog>
        <DialogTrigger asChild>
          <Avatar src={user.image} />
        </DialogTrigger>
        <EditProfileModal />
      </Dialog>
      <p className='pb-2 text-center'>{user?.name} さん</p>
    </div>
  )
}

export default Profile
