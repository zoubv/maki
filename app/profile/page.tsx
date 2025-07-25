"use client"

import { useSession } from "next-auth/react"
import { updateProfile } from "@/lib/actions/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/logout-button"
import { motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"
import ProfileForm from "@/components/profile-form"

// Mock user data (should match the structure from lib/auth.ts MOCK_USERS)
const MOCK_USERS_PROFILE = [
  {
    id: "1",
    pseudo: "maki_admin",
    email: "admin@maki.com",
    bio: "Administrateur de Maki.",
    avatar_url: "/placeholder.svg?height=96&width=96",
    est_createur: true,
    est_premium: true,
  },
  {
    id: "2",
    pseudo: "createur_maki",
    email: "creator@maki.com",
    bio: "Créateur d'événements urbains.",
    avatar_url: "/placeholder.svg?height=96&width=96",
    est_createur: true,
    est_premium: false,
  },
  {
    id: "3",
    pseudo: "utilisateur_simple",
    email: "user@maki.com",
    bio: "Passionné de culture urbaine.",
    avatar_url: "/placeholder.svg?height=96&width=96",
    est_createur: false,
    est_premium: false,
  },
]

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<any>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        setLoadingUser(true)
        try {
          // Simulate fetching user from a "database"
          const fetchedUser = MOCK_USERS_PROFILE.find((u) => u.id === session.user.id)
          setUser(fetchedUser)
        } catch (error) {
          console.error("Failed to fetch user data:", error)
        } finally {
          setLoadingUser(false)
        }
      } else if (status === "unauthenticated") {
        setLoadingUser(false)
      }
    }
    fetchUser()
  }, [session, status])

  if (status === "loading" || loadingUser) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <p>Chargement du profil...</p>
      </div>
    )
  }

  if (!session?.user?.id) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>Veuillez vous connecter pour voir votre profil.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/auth/login">Se connecter</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Utilisateur introuvable</CardTitle>
            <CardDescription>Le profil demandé n'existe pas.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 lg:py-12"
    >
      <Card className="max-w-3xl mx-auto shadow-xl border-makiGreen-500/20 dark:border-makiOrange-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-makiGreen-700 dark:text-makiOrange-400">Mon Profil</CardTitle>
          <CardDescription className="text-muted-foreground">
            Gérez vos informations personnelles et votre statut.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-makiGreen-500 dark:border-makiOrange-500">
              <AvatarImage src={user.avatar_url || "/placeholder.svg?height=96&width=96"} alt={user.pseudo} />
              <AvatarFallback>{user.pseudo.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-semibold">{user.pseudo}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex gap-2">
              {user.est_createur && (
                <span className="inline-flex items-center rounded-full bg-makiGreen-100 px-3 py-1 text-sm font-medium text-makiGreen-800 dark:bg-makiGreen-900 dark:text-makiGreen-200">
                  Créateur
                </span>
              )}
              {user.est_premium && (
                <span className="inline-flex items-center rounded-full bg-makiOrange-100 px-3 py-1 text-sm font-medium text-makiOrange-800 dark:bg-makiOrange-900 dark:text-makiOrange-200">
                  Premium
                </span>
              )}
            </div>
          </div>

          <Separator />

          <Suspense fallback={<div>Chargement du formulaire...</div>}>
            {user && <ProfileForm user={user} updateProfile={updateProfile} />}
          </Suspense>

          <Separator />

          <div className="flex justify-center">
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
