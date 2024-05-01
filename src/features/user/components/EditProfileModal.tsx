import Image from 'next/image'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useUpdateUser } from '../hooks/useUpdateUser'

import Avatar from './Avatar'

type EditProfileModalProps = {
  src: string | undefined
}

const EditProfileModal = ({ src }: EditProfileModalProps) => {
  const { preview, previewImage, reset } = useUpdateUser()
  const avatar = src ?? '/avatar.png'

  return (
    <Dialog onOpenChange={reset}>
      <DialogTrigger>
        <Avatar src={avatar} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogDescription>プロフィールを編集</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Image
              alt='avatar'
              className='mx-auto mb-5 size-[100px] rounded-full'
              height={100}
              src={preview || avatar}
              width={100}
            />
            <Label htmlFor='image'>Avatar</Label>
            <Input
              id='image'
              onChange={(e) => {
                previewImage(e)
              }}
              type='file'
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
