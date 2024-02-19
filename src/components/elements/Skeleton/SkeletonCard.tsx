import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonCard = () => {
  return (
    <div className='mx-auto h-[320px] w-[250px]'>
      <div className='flex flex-col space-y-3 text-center'>
        <div className='mb-3 mt-5'>
          <Skeleton className='ml-4 h-[30px] w-[120px]' />
        </div>
        <Skeleton className='mx-auto h-[150px] w-[200px]' />
      </div>
    </div>
  )
}
