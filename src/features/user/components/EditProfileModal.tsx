import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { ChangeEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

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

import { useUpdateProfile, updateProfileInputSchema } from '../api'
import { User } from '../types'

import Avatar from './Avatar'

import type { UpdateProfileInput } from '../api'

type EditProfileModalProps = {
  user: User
}

const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        toast.success('プロフィールを更新しました')
      },
      onError: () => {
        toast.error('プロフィールの更新に失敗しました')
      },
    },
  })
  const [image, setImage] = useState<string>(user.image || '')

  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImage(window.URL.createObjectURL(file))
    }
  }

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileInputSchema),
    defaultValues: {
      name: user.name,
      image: undefined,
    },
  })

  const onSubmit: SubmitHandler<UpdateProfileInput> = (values) => {
    updateProfileMutation.mutate({
      data: {
        name: values.name,
        image: values.image,
      },
    })
  }

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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className='mt-5'>
                <DialogClose asChild>
                  <Button
                    className='mt-5 w-full'
                    disabled={updateProfileMutation.isLoading}
                    isLoading={updateProfileMutation.isLoading}
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
