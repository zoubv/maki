"use client"

import { useSession } from "next-auth/react"
import { submitEvent } from "@/lib/actions/event"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import SubmitEventForm from "@/components/submit-event-form"
import { useEffect, useState } from "react"

// Mock data for categories
const MOCK_CATEGORIES = [
  { id: 1, nom: "Concert" },
  { id: 2, nom: "Exposition" },
  { id: 3, nom: "Mode" },
  { id: 4, nom: "Danse" },
  { id: 5, nom: "Sport Urbain" },
]

export default function SubmitEventPage() {
  const { status } = useSession() // We still need status for loading state
  const [categories, setCategories] = useState<any[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      try {
        // Simulate fetching categories
        setCategories(MOCK_CATEGORIES)
      } catch (error) {
        console.error("Failed to fetch event categories:", error)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  if (status === "loading" || loadingCategories) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <p>Chargement de la page...</p>
      </div>
    )
  }

  // Removed the check for session?.user?.id here.
  // The form is now accessible to everyone.
  // The authentication check will happen in the server action.

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-8 px-4 md:px-6 lg:py-12"
    >
      <Card className="max-w-3xl mx-auto shadow-xl border-makiGreen-500/20 dark:border-makiOrange-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-makiGreen-700 dark:text-makiOrange-400">
            Soumettre un Événement
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Partagez votre événement avec la communauté Maki.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmitEventForm categories={categories} submitAction={submitEvent} />
        </CardContent>
      </Card>
    </motion.div>
  )
}
