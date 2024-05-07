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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useUpdateUser } from '../hooks/useUpdateUser'

import Avatar from './Avatar'

const formSchema = z.object({
  name: z.string().min(1, '必須項目です'),
  image: z.any(),
})

type EditProfileModalProps = {
  src: string | undefined
}

const EditProfileModal = ({ src }: EditProfileModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const { image, previewImage, resetInfo } = useUpdateUser()
  const avatar = src ?? '/avatar.png'

  return (
    <Dialog onOpenChange={resetInfo}>
      <DialogTrigger>
        <Avatar src={avatar} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogDescription>プロフィールを編集</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Form {...form}>
              <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
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
                  render={({ field: { onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>プロフィール画像</FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          {...fieldProps}
                          accept='image/*'
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            onChange(event.target.files && event.target.files)
                            previewImage(event)
                          }}
                        />
                      </FormControl>
                      <FormDescription>画像を選択してください</FormDescription>
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
                        <Input placeholder='おーせ' {...field} />
                      </FormControl>
                      <FormDescription>30文字まで設定可能です</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='w-full' type='submit' variant='outline'>
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal
