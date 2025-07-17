"use client"

import { useFormState, useFormStatus } from "react-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface ProfileFormProps {
  user: {
    id: string
    pseudo: string
    email: string
    bio?: string | null
    avatar_url?: string | null
    est_createur: boolean
    est_premium: boolean
  }
  updateProfile: (prevState: any, formData: FormData) => Promise<{ message: string; errors?: any; user?: any }>
}

export default function ProfileForm({ user, updateProfile }: ProfileFormProps) {
  const [state, formAction] = useFormState(updateProfile, { message: "" })

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: "Erreur de validation",
          description: state.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Succès",
          description: state.message,
          variant: "default",
        })
      }
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pseudo">Pseudo</Label>
          <Input id="pseudo" name="pseudo" type="text" defaultValue={user.pseudo} />
          {state.errors?.pseudo && <p className="text-destructive text-sm mt-1">{state.errors.pseudo}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={user.email} disabled />
          <p className="text-muted-foreground text-sm">L'email ne peut pas être modifié.</p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" defaultValue={user.bio || ""} placeholder="Parlez-nous de vous..." rows={4} />
        {state.errors?.bio && <p className="text-destructive text-sm mt-1">{state.errors.bio}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar_url">URL de l'Avatar</Label>
        <Input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={user.avatar_url || ""}
          placeholder="https://example.com/avatar.jpg"
        />
        {state.errors?.avatar_url && <p className="text-destructive text-sm mt-1">{state.errors.avatar_url}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-makiGreen-500 to-makiOrange-500 text-white font-semibold py-2 rounded-md hover:from-makiGreen-600 hover:to-makiOrange-600 transition-all duration-300"
      disabled={pending}
    >
      {pending ? "Mise à jour..." : "Mettre à jour le profil"}
    </Button>
  )
}
