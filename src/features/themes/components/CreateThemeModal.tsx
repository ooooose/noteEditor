'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { Modal } from '@/components/elements'
import { Button } from '@/components/elements/Button'
import { Form, Input } from '@/components/elements/Form'
import { Skeleton } from '@/components/ui/skeleton'

import { apiClient } from '@/lib/api/api-client'

import { useFetchThemes } from '../hooks/useFetchThemes'

const schema = z.object({
  title: z.string().min(1, '入力してください'),
})

type ThemeValue = {
  email: string
  title: string
}

export const CreateThemeModal = () => {
  const { mutate } = useFetchThemes()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const createTheme = async (data: ThemeValue) => {
    const params = {
      ...data,
      email: session?.user.email,
    }
    await apiClient.apiPost('/api/themes', params).then((res) => {
      if (res && res.status === 201) {
        toast('テーマを作成しました', { position: 'top-center' })
        void mutate()
        setOpen(false)
      } else if (res?.status === 500) {
        toast('テーマの作成に失敗しました', { position: 'top-center' })
      }
    })
  }

  const onSubmit = async (values: ThemeValue) => {
    await createTheme(values)
  }

  if (!session) return <Skeleton className='inline-block h-[40px] w-[100px]' />
  return (
    <Modal
      description='テーマを作成することができます'
      open={open}
      setOpen={setOpen}
      text='テーマ作成'
    >
      <Form<ThemeValue, typeof schema>
        onSubmit={async (values) => {
          await onSubmit(values)
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <Input
              error={formState.errors['title']}
              label='タイトル'
              registration={register('title')}
              type='text'
            />
            <div>
              <Button className='mt-6 w-full' type='submit' variant='outline'>
                作成する
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  )
}
