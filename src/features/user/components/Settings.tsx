'use client'

import { Key, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useProfile } from '../api'

import { DeleteUser } from './DeleteUser'
import { EditUserForm } from './EditUserForm'
import { LoadingUserForm } from './LoadingUserForm'

export default function Settings() {
  const useProfileQuery = useProfile({})
  return (
    <main className='w-full py-6 sm:py-8'>
      <div className='mx-auto w-full max-w-4xl space-y-6 px-0 sm:px-1'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>設定</h1>
            <p className='text-gray-500'>アカウントと設定を管理します</p>
          </div>
        </div>

        <Tabs className='space-y-4' defaultValue='profile'>
          <TabsList className='grid w-full grid-cols-2 bg-gray-100'>
            <TabsTrigger className='gap-2 text-sm sm:text-base' value='profile'>
              <User className='size-4' />
              プロフィール
            </TabsTrigger>
            <TabsTrigger className='gap-2 text-sm sm:text-base' value='account'>
              <Key className='size-4' />
              アカウント
            </TabsTrigger>
          </TabsList>

          <TabsContent className='min-h-[480px] space-y-4' value='profile'>
            {useProfileQuery.isLoading ? (
              <LoadingUserForm />
            ) : (
              <EditUserForm user={useProfileQuery.data} />
            )}
          </TabsContent>

          <TabsContent className='min-h-[480px] space-y-4' value='account'>
            <Card className='border-red-200 bg-red-50/80'>
              <CardHeader className='p-5 sm:p-6'>
                <CardTitle className='text-red-600'>危険な操作</CardTitle>
                <CardDescription>一度実行すると取り消すことができません</CardDescription>
              </CardHeader>
              <CardContent className='px-5 pb-5 sm:px-6 sm:pb-6'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='w-full sm:w-auto' variant='destructive'>
                      アカウントを削除
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='w-[calc(100vw-2rem)] max-w-md sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>本当にアカウントを削除しますか？</DialogTitle>
                      <DialogDescription>
                        この操作は取り消すことができません。すべてのデータが完全に削除されます。
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DeleteUser userUid={useProfileQuery.data?.uid} />
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
