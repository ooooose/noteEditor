import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
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

const formSchema = z.object({
  name: z.string().min(1, '必須項目です'),
  image: z.any(),
})

type EditProfileModalProps = {
  user: AuthUser
}

const EditProfileModal = ({ user }: EditProfileModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const { image, username, setUsername, previewImage, resetInfo } = useUpdateUser(user)
  const avatar = user.image ?? '/avatar.png'

  return (
    <Dialog onOpenChange={resetInfo}>
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
                render={({ field: { ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>プロフィール画像</FormLabel>
                    <FormControl>
                      <Input
                        type='file'
                        {...fieldProps}
                        accept='image/*'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          previewImage(event)
                        }}
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
                      <Input
                        {...field}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='mt-5 w-full' type='submit' variant='outline'>
                更新
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
