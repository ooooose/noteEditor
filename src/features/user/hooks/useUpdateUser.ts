import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { useFetchAuthUserByEmail } from '@/features/auth/hooks/useFetchAuthUserByEmail'
import { AuthUser } from '@/features/auth/types'

import { updateUser } from '../api/updateUser'

const formSchema = z.object({
  name: z.string().min(1, '必須項目です').max(30, '最大文字数を超過しています'),
  image: z.instanceof(File).optional(),
})

export const useUpdateUser = (user: AuthUser) => {
  const [image, setImage] = useState<string>(user.image || '')
  const { isLoading, mutate } = useFetchAuthUserByEmail()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      image: undefined,
    },
  })

  const previewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(URL.createObjectURL(file))
      form.setValue('image', file)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData()

      formData.append('id', user.id)
      formData.append('name', values.name)
      console.log(values)
      if (values.image instanceof File) {
        formData.append('image', values.image)
      }

      await updateUser(formData)
      mutate()
      toast('プロフィールを更新しました', { position: 'top-center' })
    } catch (err) {
      console.error(err)
      toast.error('プロフィールの更新に失敗しました', { position: 'top-center' })
    }
  }

  return {
    image,
    setImage,
    previewImage,
    onSubmit,
    isLoading,
    form,
  }
}
