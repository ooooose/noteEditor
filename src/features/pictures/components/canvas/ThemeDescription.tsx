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
      <DialogTrigger>
        <div className='cursor-pointer text-blue-500'>
          <p>テーマについて</p>
        </div>
      </DialogTrigger>
      <DialogContent>
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
