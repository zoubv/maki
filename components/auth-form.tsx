"use client"

import { useFormStatus } from "react-dom"
import { useFormState } from "react-dom"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link" // Import Link
import { User } from "lucide-react" // Import User icon

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface AuthFormProps {
  type: "login" | "register"
  action: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>
}

export function AuthForm({ type, action }: AuthFormProps) {
  const [state, formAction] = useFormState(action, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state) {
      if (type === "register" && state.includes("Inscription réussie")) {
        toast({
          title: "Inscription réussie !",
          description: (
            <>
              Votre compte a été créé. Vous pouvez maintenant vous{" "}
              <Link href="/auth/login" className="underline font-semibold">
                connecter
              </Link>
              .
            </>
          ),
          variant: "default",
        })
        // No redirect for register, let user click the link or navigate manually
      } else if (type === "login" && !state.includes("invalide") && !state.includes("Échec")) {
        toast({
          title: "Connexion réussie !",
          description: "Bienvenue sur Maki.",
          variant: "default",
        })
        router.push("/") // Redirect to home on successful login
      } else {
        toast({
          title: "Erreur",
          description: state,
          variant: "destructive",
        })
      }
    }
  }, [state, router, type])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-makiGreen-500/10 to-makiOrange-500/10 p-4"
    >
      <Card className="w-full max-w-md shadow-xl border-makiGreen-500/20 dark:border-makiOrange-500/20">
        <CardHeader className="space-y-1 text-center">
          {type === "login" && <User className="mx-auto h-10 w-10 text-makiGreen-700 dark:text-makiOrange-400 mb-2" />}
          <CardTitle className="text-3xl font-bold text-makiGreen-700 dark:text-makiOrange-400">
            {type === "login" ? "Connexion" : "Inscription"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {type === "login"
              ? "Entrez vos identifiants pour accéder à votre compte."
              : "Créez un compte pour rejoindre la communauté Maki."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {type === "register" && (
              <div className="space-y-2">
                <Label htmlFor="pseudo">Pseudo</Label>
                <Input id="pseudo" name="pseudo" type="text" placeholder="Votre pseudo" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="maki@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <SubmitButton type={type} />
          </form>
          {type === "login" && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-makiGreen-600 hover:underline dark:text-makiOrange-400"
              >
                Créer un compte
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SubmitButton({ type }: { type: "login" | "register" }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-makiGreen-500 to-makiOrange-500 text-white font-semibold py-2 rounded-md hover:from-makiGreen-600 hover:to-makiOrange-600 transition-all duration-300"
      disabled={pending}
    >
      {pending
        ? type === "login"
          ? "Connexion en cours..."
          : "Inscription en cours..."
        : type === "login"
          ? "Se connecter"
          : "S'inscrire"}
    </Button>
  )
}
