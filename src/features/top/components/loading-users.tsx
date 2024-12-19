import { Skeleton } from '@/components/ui/skeleton'

export const LoadingUsers = () => {
  return (
    <div>
      <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => {
          return (
            <div className='flex flex-col items-center p-4 text-center' key={i}>
              <h3 className='text-2xl font-semibold'>第{i + 1}位</h3>
              <Skeleton className='mt-2 size-24 rounded-full' />
              <div className='mt-2 flex flex-col gap-2'>
                <Skeleton className='mx-auto h-6 w-[120px]' />
                <Skeleton className='mx-auto h-4 w-[60px]' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
