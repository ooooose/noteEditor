import { Button } from '@/components/elements/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'

export const ThemeDescription = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full sm:w-auto' variant='outline'>
          テーマについて
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[calc(100vw-2rem)] max-w-md sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>テーマとは？</DialogTitle>
        </DialogHeader>
        <DialogDescription className='mb-5'>
          設定されたテーマに沿って絵を書いてみましょう！
          <br />
          ランダムに設定されますが、選択し直すことも作成することも可能です！
        </DialogDescription>
        <DialogClose asChild>
          <Button className='bg-gray-100' variant='outline'>
            閉じる
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
