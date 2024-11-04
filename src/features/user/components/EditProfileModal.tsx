import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState, ChangeEvent } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

import { middleApiClient } from '@/lib/api/middle-api-client'

import { useUpdateProfile } from '../api'
import { User } from '../types'

import Avatar from './Avatar'

type EditProfileModalProps = {
  user: User | undefined
}

const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const [imagePreview, setImagePreview] = useState<string>(user?.image || '')

  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => toast.success('プロフィールを更新しました'),
      onError: () => toast.error('プロフィールの更新に失敗しました'),
    },
  })

  type UpdateProfileInput = {
    name: string
    image?: File
  }

  const updateProfileInputSchema = z.object({
    name: z
      .string()
      .min(1, '入力必須です')
      .max(40, '名前は40文字以内で入力してください')
      .optional(),
    image: z.any().optional(),
  })

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileInputSchema),
    defaultValues: {
      name: user?.name,
      image: undefined,
    },
  })

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImagePreview(URL.createObjectURL(file))
  }

  const onSubmit: SubmitHandler<UpdateProfileInput> = async (values) => {
    let imageUrl = user?.image

    if (values.image && values.image instanceof File) {
      const formData = new FormData()
      formData.append('id', user?.uid ?? '')
      formData.append('name', values.name || '')
      formData.append('image', values.image)

      const response = await middleApiClient.apiPostFormData('/api/profile', formData)
      const data = await response.json()
      imageUrl = data.imageUrl
    }
    updateProfileMutation.mutate({
      data: {
        name: values.name,
        image: imageUrl,
      },
    })
  }

  const avatarSrc = user?.image || '/avatar.png'

  return (
    <Dialog onOpenChange={() => setImagePreview('')}>
      <DialogTrigger>
        <Avatar src={avatarSrc} />
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
                priority
                src={imagePreview || avatarSrc}
                width={100}
              />
              <Controller
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>プロフィール画像</FormLabel>
                    <FormControl>
                      <Input
                        accept='image/*'
                        onChange={(e) => {
                          handleImagePreview(e)
                          field.onChange(e.target.files?.[0])
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
                      setImagePreview('')
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
