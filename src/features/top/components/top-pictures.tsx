import { TopPicture } from './top-picture'

export const TopPictures = () => {
  return (
    <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-3'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <TopPicture key={i} />
      ))}
    </div>
  )
}
