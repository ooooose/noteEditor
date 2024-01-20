import { Button } from '@/components/ui/button'
import AuthModal from '@/components/elements/Modal/AuthModal'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='my-20'>ここにImageを持ってくる。</div>
      <div className='my-10'>
        <p>Tipserは、あなたの持っているTipsを共有するアプリです。</p>
      </div>
      <AuthModal />
    </main>
  )
}
