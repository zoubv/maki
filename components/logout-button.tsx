"use client"

import { logout } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const { pending } = useFormStatus()
  return (
    <form action={logout}>
      <Button
        type="submit"
        variant="destructive"
        className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
        disabled={pending}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {pending ? "Déconnexion..." : "Se déconnecter"}
      </Button>
    </form>
  )
}
