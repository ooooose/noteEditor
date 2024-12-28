import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useState, ChangeEvent, useRef } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
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

import type { User } from '../types'

type EditProfileModalProps = {
  user: User | undefined
}

export const EditUserForm = ({ user }: EditProfileModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>プロフィール情報を管理します</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <CardContent className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  alt='avatar'
                  className='size-20 rounded-full'
                  height={100}
                  onError={() => setImagePreview('/avatar.png')}
                  priority
                  src={imagePreview || user?.image || '/avatar.png'}
                  width={100}
                />

                <Controller
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            accept='image/*'
                            className='hidden'
                            onChange={(e) => {
                              handleImagePreview(e)
                              field.onChange(e.target.files?.[0])
                            }}
                            ref={inputRef}
                            type='file'
                          />
                          <Button
                            icon={<Camera />}
                            onClick={() => inputRef.current?.click()}
                            type='button'
                            variant='outline'
                          >
                            画像を変更
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid gap-4'>
                <div className='grid w-64 gap-2'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <FormLabel>お名前</FormLabel>
                            <Input {...field} placeholder='お名前を入力してください' />
                          </div>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={updateProfileMutation.isPending}
                isLoading={updateProfileMutation.isPending}
                type='submit'
              >
                変更を保存
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  )
}
