'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as z from 'zod'
import { useSession, signIn } from 'next-auth/react'

import { Button } from '@/components/elements/Button'
import { Form, Input } from '@/components/elements/Form'

const schema = z.object({
  email: z.string().min(1, '1文字以上で入力してください'),
  password: z.string().min(6, '6文字以上で入力してください'),
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
    console.log(data)
    await signIn('credentials', {
      ...data,
      redirect: false,
    })
    router.push('/')
  }
  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async (values) => {
          await loginUser(values)
          onSuccess()
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
              <Button isLoading={!!session} type='submit' className='w-full'>
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
