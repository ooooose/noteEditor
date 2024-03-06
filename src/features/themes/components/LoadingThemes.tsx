import { Skeleton } from '@/components/ui/skeleton'

const LoadingThemes = () => {
  return (
    <div className='flex gap-3'>
      {[...Array(5)].map((_, i) => {
        return <Skeleton className='h-[40px] w-[140px] rounded-full border' key={i} />
      })}
    </div>
  )
}

export default LoadingThemes
