"use client"

import { CardHeader } from "@/components/ui/card"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { CalendarDays, MapPin, Euro } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// Mock data for events - UPDATED
const MOCK_EVENTS = [
  {
    id: "e1",
    titre: "Festival Street Vibes",
    description:
      "Un festival incontournable célébrant la musique, la danse et l'art urbain. Venez découvrir des talents émergents et des artistes confirmés dans une ambiance électrique.",
    image_url: "/placeholder.svg?height=200&width=400",
    lieu: "Parc de la Villette",
    adresse_exacte: "211 Avenue Jean Jaurès, 75019 Paris",
    organisateur: "Urban Beats Collective",
    date_evenement: "2024-08-15T18:00:00Z",
    est_gratuit: false,
    prix: 25.0,
    id_categorie: 1,
    category_name: "Concert",
    id_createur: 2,
    statut: "approuve",
  },
  {
    id: "e2",
    titre: "Exposition Graffiti 'Murmures Urbains'",
    description:
      "Plongez dans l'univers du graffiti parisien à travers une collection d'œuvres inédites. Une exploration des styles et des messages qui animent nos murs.",
    image_url: "/placeholder.svg?height=200&width=400",
    lieu: "Galerie d'Art Urbain",
    adresse_exacte: "12 Rue de Thorigny, 75003 Paris",
    organisateur: "Artistic Flow",
    date_evenement: "2024-07-20T10:00:00Z",
    est_gratuit: true,
    prix: null,
    id_categorie: 2,
    category_name: "Exposition",
    id_createur: 1,
    statut: "approuve",
  },
  {
    id: "e3",
    titre: "Pop-up Store 'Sneaker Addict'",
    description:
      "Le rendez-vous des passionnés de sneakers ! Découvrez les dernières collections, des éditions limitées et des collaborations exclusives. Des ateliers de customisation seront également proposés.",
    image_url: "/placeholder.svg?height=200&width=400",
    lieu: "Rue de Rivoli",
    adresse_exacte: "144 Rue de Rivoli, 75001 Paris",
    organisateur: "SneakerHead France",
    date_evenement: "2024-07-28T11:00:00Z",
    est_gratuit: true,
    prix: null,
    id_categorie: 3,
    category_name: "Mode",
    id_createur: 2,
    statut: "approuve",
  },
  {
    id: "e4",
    titre: "Battle de Breakdance 'Paris Flow'",
    description:
      "Les meilleurs danseurs de breakdance s'affrontent dans une compétition époustouflante. Venez soutenir vos crews préférés et assister à des performances incroyables.",
    image_url: "/placeholder.svg?height=200&width=400",
    lieu: "Place de la République",
    adresse_exacte: "Place de la République, 75003 Paris",
    organisateur: "Breakdance Paris",
    date_evenement: "2024-08-05T16:00:00Z",
    est_gratuit: false,
    prix: 10.0,
    id_categorie: 4,
    category_name: "Danse",
    id_createur: 1,
    statut: "approuve", // Changed to approved for display
  },
]

// Mock data for categories
const MOCK_CATEGORIES = [
  { id: 1, nom: "Concert" },
  { id: 2, nom: "Exposition" },
  { id: 3, nom: "Mode" },
  { id: 4, nom: "Danse" },
  { id: 5, nom: "Sport Urbain" },
]

interface EventFilters {
  category?: string
  date?: string
  isFree?: string // string because it comes from URL params
}

export default function EventsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [events, setEvents] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentCategory = searchParams.get("category") || "all"
  const currentDate = searchParams.get("date") || ""
  const currentIsFree = searchParams.get("isFree") || "all"

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching events with filters
        const filteredEvents = MOCK_EVENTS.filter((event) => {
          const matchesCategory = currentCategory === "all" || event.category_name === currentCategory
          const matchesDate = !currentDate || new Date(event.date_evenement).toISOString().split("T")[0] === currentDate
          const matchesIsFree = currentIsFree === "all" || event.est_gratuit.toString() === currentIsFree
          return matchesCategory && matchesDate && matchesIsFree
        })
        setEvents(filteredEvents)

        // Simulate fetching categories
        setCategories(MOCK_CATEGORIES)
      } catch (err) {
        console.error("Failed to fetch events or categories:", err)
        setError("Échec du chargement des événements ou des catégories.")
      } finally {
        setLoading(false)
      }
    }
    fetchPageData()
  }, [currentCategory, currentDate, currentIsFree]) // Re-fetch when filters change

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(name, value)
    } else {
      params.delete(name)
    }
    return params.toString()
  }

  const handleFilterChange = (name: string, value: string) => {
    router.push(`/events?${createQueryString(name, value)}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <p className="text-lg text-muted-foreground">Chargement des événements...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Erreur de chargement</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>Réessayer</Button>
          </CardContent>
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-makiGreen-500 to-makiOrange-500">
          Agenda Événementiel
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground mt-4">
          Découvrez les drops, pop-ups, expos, concerts et plus encore à Paris.
        </p>
      </motion.div>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-lg shadow-inner bg-background/50 border border-makiGreen-500/10 dark:border-makiOrange-500/10">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select
            name="category"
            value={currentCategory}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.nom}>
                  {cat.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={currentDate}
            onChange={(e) => handleFilterChange("date", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="isFree">Prix</Label>
          <Select name="isFree" value={currentIsFree} onValueChange={(value) => handleFilterChange("isFree", value)}>
            <SelectTrigger id="isFree">
              <SelectValue placeholder="Tous" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="true">Gratuit</SelectItem>
              <SelectItem value="false">Payant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            type="button"
            onClick={() => router.push("/events")}
            variant="outline"
            className="w-full border-makiGreen-500 text-makiGreen-500 hover:bg-makiGreen-500 hover:text-white dark:border-makiOrange-500 dark:text-makiOrange-500 dark:hover:bg-makiOrange-500 dark:hover:text-white"
          >
            Réinitialiser
          </Button>
        </div>
      </form>

      {events.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg mt-8">Aucun événement trouvé avec ces filtres.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              className="group"
            >
              <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-makiGreen-500/20 dark:border-makiOrange-500/20">
                <Link href={`/events/${event.id}`} className="block">
                  <Image
                    src={event.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={event.titre}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4">
                  <Link href={`/events/${event.id}`} className="block">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-makiGreen-600 dark:group-hover:text-makiOrange-400 transition-colors">
                      {event.titre}
                    </CardTitle>
                  </Link>
                  <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </CardDescription>
                  <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-makiGreen-600 dark:text-makiOrange-400" />
                      <span>{new Date(event.date_evenement).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-makiGreen-600 dark:text-makiOrange-400" />
                      <span>{event.lieu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {event.est_gratuit ? (
                        <Badge
                          variant="secondary"
                          className="bg-makiGreen-100 text-makiGreen-800 dark:bg-makiGreen-900 dark:text-makiGreen-200"
                        >
                          Gratuit
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-makiOrange-100 text-makiOrange-800 dark:bg-makiOrange-900 dark:text-makiOrange-200"
                        >
                          <Euro className="h-3 w-3 mr-1" /> {event.prix?.toFixed(2)} EUR
                        </Badge>
                      )}
                    </div>
                  </div>
                  {event.category_name && (
                    <Badge
                      variant="outline"
                      className="mt-3 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    >
                      {event.category_name}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
