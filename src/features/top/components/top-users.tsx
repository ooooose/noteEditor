import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

export const TopUsers = () => {
  return (
    <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-3'>
      {[1, 2, 3].map((i) => (
        <div className='flex flex-col items-center p-4 text-center' key={i}>
          <h3 className='text-2xl font-semibold'>第{i}位</h3>
          <Avatar className='my-2 rounded-full transition-shadow hover:shadow-lg'>
            <AvatarImage className='size-24 rounded-full' src='/avatar.png' />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <div className='text-xl'>Aさん</div>
            <p className='text-sm text-gray-500'>10 いいね</p>
          </div>
        </div>
      ))}
    </div>
  )
}
