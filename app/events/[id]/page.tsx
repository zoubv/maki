"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, CalendarDays, MapPin, Euro, Users } from "lucide-react" // Added Users icon
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

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
    statut: "approuve",
  },
]

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulate fetching event by ID
        const fetchedEvent = MOCK_EVENTS.find((e) => e.id === params.id)
        setEvent(fetchedEvent)
      } catch (err) {
        console.error("Failed to fetch event:", err)
        setError("Échec du chargement de l'événement.")
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <p className="text-lg text-muted-foreground">Chargement de l'événement...</p>
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

  if (!event) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Événement introuvable</CardTitle>
            <CardDescription>L'événement que vous recherchez n'existe pas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/events">Retour aux événements</Link>
            </Button>
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
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mb-6"
      >
        <Link href="/events" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux événements
        </Link>
      </motion.div>

      <Card className="max-w-4xl mx-auto shadow-xl border-makiGreen-500/20 dark:border-makiOrange-500/20">
        <CardHeader>
          <Image
            src={event.image_url || "/placeholder.svg?height=400&width=800"}
            alt={event.titre}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <CardTitle className="text-3xl md:text-4xl font-bold leading-tight text-makiGreen-700 dark:text-makiOrange-400">
            {event.titre}
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-makiGreen-600 dark:text-makiOrange-400" />
              <span>{new Date(event.date_evenement).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-5 w-5 text-makiGreen-600 dark:text-makiOrange-400" />
              <span>{event.adresse_exacte}</span> {/* Display exact address */}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Users className="h-5 w-5 text-makiGreen-600 dark:text-makiOrange-400" />
              <span>Organisé par : {event.organisateur}</span> {/* Display organizer */}
            </div>
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-3">
            {event.category_name && (
              <Badge variant="outline" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                {event.category_name}
              </Badge>
            )}
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
                <Euro className="h-4 w-4 mr-1" /> {event.prix?.toFixed(2)} EUR
              </Badge>
            )}
            {event.statut === "en_attente" && (
              <Badge
                variant="destructive"
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              >
                En attente de validation
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
          <p>{event.description}</p>
          {/* Google Maps Embed */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Localisation</h3>
            <p className="text-muted-foreground mb-4">
              Cliquez sur le bouton ci-dessous pour voir l'emplacement sur la carte.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-makiGreen-500 to-makiOrange-500 text-white font-semibold py-2 rounded-md hover:from-makiGreen-600 hover:to-makiOrange-600 transition-all duration-300"
            >
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.adresse_exacte)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur la carte
              </a>
            </Button>
          </div>

          {!event.est_gratuit && (
            <Button className="mt-6 bg-gradient-to-r from-makiOrange-500 to-red-600 text-white font-semibold py-2 rounded-md hover:from-makiOrange-600 hover:to-red-700 transition-all duration-300">
              Acheter des billets
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
