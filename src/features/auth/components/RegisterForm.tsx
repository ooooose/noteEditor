'use client'

import * as React from 'react'
import * as z from 'zod'

import { Button } from '@/components/elements/Button'
import { Form, Input } from '@/components/elements/Form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const schema = z.object({
  name: z.string().min(1, '必須項目です'),
  email: z.string().min(1, '必須項目です'),
  password: z.string().min(6, '6文字以上で入力してください'),
})

type RegisterValues = {
  name: string
  email: string
  password: string
}

type RegisterFormProps = {
  onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const router = useRouter()
  const registerUser = async (data: RegisterValues) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    const userInfo = await response.json()
  }

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await registerUser(values)
          onSuccess()
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type='text'
              label='お名前'
              error={formState.errors['name']}
              registration={register('name')}
            />
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
              <Button type='submit' className='w-full mt-6'>
                新規登録
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className='mt-2 flex items-center justify-end'>
        <div className='text-sm'>
          ログイン画面は
          <Link href='/login' className='font-medium text-blue-600 hover:text-blue-500'>
            こちら
          </Link>
        </div>
      </div>
    </div>
  )
}
