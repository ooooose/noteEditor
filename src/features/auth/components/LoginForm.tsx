'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { useSession, signIn, SignInResponse } from 'next-auth/react'
import { toast } from 'sonner'

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

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
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
              type='email'
              label='メールアドレス'
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type='password'
              label='パスワード'
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div>
              <Button isLoading={!!session} type='submit' className='w-full mt-6'>
                ログイン
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className='mt-2 flex items-center justify-end'>
        <div className='text-sm'>
          新規登録は
          <Link href='/register' className='font-medium text-blue-600 hover:text-blue-500'>
            こちら
          </Link>
        </div>
      </div>
    </div>
  )
}
