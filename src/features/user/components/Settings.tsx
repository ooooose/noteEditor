'use client'

import { Camera, Key, Lock, Palette, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useProfile } from '../api'

import { DeleteUser } from './DeleteUser'
import { LoadingSettings } from './LoadingSettings'

export default function Settings() {
  const useProfileQuery = useProfile({})
  if (useProfileQuery.isLoading) return <LoadingSettings />
  return (
    <main className='container h-[600px] py-6'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>設定</h1>
            <p className='text-gray-500'>アカウントと設定を管理します</p>
          </div>
        </div>

        <Tabs className='space-y-4' defaultValue='profile'>
          <TabsList>
            <TabsTrigger className='gap-2' value='profile'>
              <User className='size-4' />
              プロフィール
            </TabsTrigger>
            <TabsTrigger className='gap-2' value='account'>
              <Key className='size-4' />
              アカウント
            </TabsTrigger>
            <TabsTrigger className='gap-2' value='appearance'>
              <Palette className='size-4' />
              外観
            </TabsTrigger>
          </TabsList>

          <TabsContent className='space-y-4' value='profile'>
            <Card>
              <CardHeader>
                <CardTitle>プロフィール</CardTitle>
                <CardDescription>プロフィール情報を管理します</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <Avatar className='size-20'>
                    <AvatarImage src={useProfileQuery.data?.image} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <Button icon={<Camera />} variant='outline'>
                    画像を変更
                  </Button>
                </div>
                <div className='grid gap-4'>
                  <div className='grid w-64 gap-2'>
                    <Label htmlFor='name'>お名前</Label>
                    <Input id='name' placeholder='合瀬雄記' />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>変更を保存</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent className='space-y-4' value='account'>
            <Card className='border-red-200 bg-red-50'>
              <CardHeader>
                <CardTitle className='text-red-600'>危険な操作</CardTitle>
                <CardDescription>一度実行すると取り消すことができません</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='destructive'>アカウントを削除</Button>
                  </DialogTrigger>
                  <DialogContent>
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

          <TabsContent className='space-y-4' value='appearance'>
            <Card>
              <CardHeader>
                <CardTitle>外観設定</CardTitle>
                <CardDescription>アプリの見た目をカスタマイズします</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between space-x-4'>
                  <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2'>
                      <Lock className='size-4' />
                      <Label htmlFor='private'>ダークモード</Label>
                    </div>
                    <p className='text-sm text-gray-500'>暗めの配色に切り替えます</p>
                  </div>
                  {/* <Switch id="private" /> */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
