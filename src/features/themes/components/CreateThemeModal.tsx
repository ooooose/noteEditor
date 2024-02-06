'use client'

import React, { useState } from 'react'

import { Modal } from '@/components/elements'
import { Button } from '@/components/elements/Button'
import { useSession } from 'next-auth/react'
import * as z from 'zod'
import { useToast } from '@/components/ui/use-toast'

import { Form, Input } from '@/components/elements/Form'
import { apiClient } from '@/lib/axios/api-client'
import { Skeleton } from '@/components/ui/skeleton'
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
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const createTheme = async (data: ThemeValue) => {
    const params = {
      ...data,
      email: session?.user.email,
    }
    await apiClient.apiPost('/api/themes', params).then((res) => {
      if (res && res.status === 201) {
        mutate()
        setOpen(false)
      } else if (res?.status === 500) {
        toast({
          description: '作成に失敗しました',
          variant: 'destructive',
        })
      }
    })
  }

  const onSubmit = async (values: ThemeValue) => {
    await createTheme(values)
  }

  if (!session) return <Skeleton className='w-[80px] h-[30px] ml-4' />
  return (
    <Modal
      text='テーマ作成'
      description='テーマを作成することができます'
      open={open}
      setOpen={setOpen}
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
              type='text'
              label='タイトル'
              error={formState.errors['title']}
              registration={register('title')}
            />
            <div>
              <Button type='submit' className='w-full mt-6' variant='outline'>
                作成する
              </Button>
            </div>
          </>
        )}
      </Form>
    </Modal>
  )
}
