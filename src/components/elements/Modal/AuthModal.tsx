import React from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">はじめる</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Markdown形式のメモアプリ
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button variant="outline">Googleアカウントでログイン</Button>
          <Button variant="outline">メールアドレスでログイン</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal