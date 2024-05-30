import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
        <DialogDescription>
          設定されたテーマに沿って絵を書いてみましょう！
          <br />
          ランダムに設定されますが、選択し直すことも作成することも可能です！
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
