'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, SignInResponse } from 'next-auth/react'
import React from 'react'
import * as z from 'zod'

import { Button } from '@/components/elements/Button'
import { Form, Input } from '@/components/elements/Form'
import { useToast } from '@/components/ui/use-toast'

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
  const { toast } = useToast()
  const router = useRouter()
  const registerUser = async (data: RegisterValues) => {
    await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    }).then(async (res: Response) => {
      if (res.status === 201) {
        await signIn('credentials', {
          ...data,
          redirect: false,
        }).then((res: SignInResponse | undefined) => {
          if (res && res.status === 200) {
            router.push('/themes')
          } else if (res?.status === 401) {
            toast({
              description: 'ログインに失敗しました',
              variant: 'destructive',
            })
          }
        })
      } else if (res.status === 400) {
        toast({
          description: '新規登録に失敗しました',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async (values) => {
          await registerUser(values)
          onSuccess()
        }}
        options={{
          shouldUnregister: true,
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <Input
              error={formState.errors['name']}
              label='お名前'
              registration={register('name')}
              type='text'
            />
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
              <Button className='mt-6 w-full' type='submit'>
                新規登録
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className='mt-2 flex items-center justify-end'>
        <div className='text-sm'>
          ログイン画面は
          <Link className='font-medium text-blue-600 hover:text-blue-500' href='/login'>
            こちら
          </Link>
        </div>
      </div>
    </div>
  )
}
