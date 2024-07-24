import Image from 'next/image'
import { ChangeEvent } from 'react'

import { Button } from '@/components/elements/Button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { AuthUser } from '@/features/auth/types'

import { useUpdateUser } from '../hooks/useUpdateUser'

import Avatar from './Avatar'

type EditProfileModalProps = {
  user: AuthUser
}

const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const { image, setImage, previewImage, isLoading, form, onSubmit } = useUpdateUser(user)
  const avatar = user.image ?? '/avatar.png'

  return (
    <Dialog
      onOpenChange={() => {
        setImage('')
      }}
    >
      <DialogTrigger>
        <Avatar src={avatar} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogDescription>プロフィールを編集</DialogDescription>
        </DialogHeader>
        <div className='grid w-full max-w-sm items-center'>
          <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <Image
                alt='avatar'
                className='mx-auto mb-5 size-[100px] rounded-full'
                height={100}
                src={image || avatar}
                width={100}
              />
              <FormField
                control={form.control}
                name='image'
                render={() => (
                  <FormItem>
                    <FormLabel>プロフィール画像</FormLabel>
                    <FormControl>
                      <Input
                        {...form.register('image')}
                        accept='image/*'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          previewImage(event)
                        }}
                        type='file'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>お名前</FormLabel>
                    <FormControl>
                      <Input {...form.register('name')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mt-5'>
                <DialogClose asChild>
                  <Button
                    className='mt-5 w-full'
                    disabled={isLoading}
                    isLoading={isLoading}
                    type='submit'
                  >
                    更新
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className='mt-2 w-full'
                    onClick={() => {
                      form.reset()
                      setImage('')
                    }}
                    variant='outline'
                  >
                    キャンセル
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
