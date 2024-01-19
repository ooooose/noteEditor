import { Button } from "@/components/ui/button"
import AuthModal from "@/components/AuthModal"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="my-20">
        ここにImageを持ってくる。
      </div>
      <div className="my-10">
        <p>
          Noterは、Markdown形式のメモアプリです。
        </p>
      </div>
      <AuthModal />
    </main>
  )
}
