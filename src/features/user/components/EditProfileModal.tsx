import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

import { DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type EditProfileModalProps = {
  src: string | undefined
}

const EditProfileModal = ({ src }: EditProfileModalProps) => {
  const [preview, setPreview] = useState<string>('')
  const avatar = src ?? '/avatar.png'
  // TODO: R2にバケット追加（この前作ったものを）
  // TODO: 画像アップロード処理を実装
  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setPreview(window.URL.createObjectURL(file))
    }
  }
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogDescription>プロフィールを編集</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Image
            alt='avatar'
            className='mx-auto rounded-full'
            height={70}
            src={preview || avatar}
            width={70}
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
  )
}

export default EditProfileModal
