import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingSettings = () => {
  return (
    <main className='container h-[600px] py-6'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>設定</h1>
            <p className='text-gray-500'>アカウントと設定を管理します</p>
          </div>
        </div>
        <div>
          <Skeleton className='mb-4 h-10 w-[330px]' />
          <Card>
            <CardHeader>
              <CardTitle>プロフィール</CardTitle>
              <CardDescription>プロフィール情報を管理します</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Skeleton className='size-20 rounded-full' />
                <Skeleton className='h-8 w-24' />
              </div>
              <div className='grid gap-4'>
                <div className='grid w-64 gap-2'>
                  <Skeleton className='h-4 w-12' />
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled>変更を保存</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
