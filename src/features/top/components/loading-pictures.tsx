import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const LoadingPictures = () => {
  return (
    <div>
      <div className='grid grid-cols-1 gap-8 px-4 sm:grid-cols-1 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <Card
            className='group mx-auto w-[80vw] max-w-[100vw] overflow-hidden bg-white/50 transition-shadow hover:shadow-lg sm:mx-auto sm:w-full sm:max-w-md'
            key={i}
          >
            <div className='p-2 sm:p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Skeleton className='size-10 rounded-full' />
                  <div>
                    <div className='mb-1 h-4 w-24 rounded bg-gray-200' />
                    <div className='h-3 w-20 rounded bg-gray-100' />
                  </div>
                </div>
              </div>
            </div>
            <div className='mx-1 md:mx-4 md:mb-2'>
              <div className='overflow-hidden'>
                <div className='mb-4 flex justify-center bg-white pb-4 md:justify-start md:p-4'>
                  <Skeleton className='aspect-[4/3] w-4/5 md:w-full' />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
