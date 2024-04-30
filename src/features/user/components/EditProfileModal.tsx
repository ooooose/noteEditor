import { DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog'

// type EditProfileModalProps = () => {
//   src: string
// }

const EditProfileModal = () => {
  // TODO: R2にバケット追加（この前作ったものを）
  // TODO: 画像アップロード処理を実装
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogDescription>プロフィールを編集</DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>ここに編集画面を置く</div>
    </DialogContent>
  )
}

export default EditProfileModal
