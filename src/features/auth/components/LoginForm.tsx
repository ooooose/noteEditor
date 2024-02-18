'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signIn, SignInResponse } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/elements/Button'
import { Form, Input } from '@/components/elements/Form'

const schema = z.object({
  email: z.string().min(1, '入力してください'),
  password: z.string().min(1, '入力してください'),
})

type LoginValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const loginUser = async (data: LoginValues) => {
    try {
      await signIn('credentials', {
        ...data,
        redirect: false,
      }).then((res: SignInResponse | undefined) => {
        if (res && res.status === 200) {
          router.push('/themes')
          // toast('ログインしました', { position: 'top-center' })
        }
      })
    } catch (err) {
      toast('ログインに失敗しました', { position: 'top-center' })
    }
  }

  const onSubmit = async (values: LoginValues) => {
    await loginUser(values)
  }
  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await onSubmit(values)
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <Input
              error={formState.errors['email']}
              label='メールアドレス'
              registration={register('email')}
              type='email'
            />
            <Input
              error={formState.errors['password']}
              label='パスワード'
              registration={register('password')}
              type='password'
            />
            <div>
              <Button className='mt-6 w-full' isLoading={!!session} type='submit'>
                ログイン
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className='mt-2 flex items-center justify-end'>
        <div className='text-sm'>
          新規登録は
          <Link className='font-medium text-blue-600 hover:text-blue-500' href='/register'>
            こちら
          </Link>
        </div>
      </div>
    </div>
  )
}
