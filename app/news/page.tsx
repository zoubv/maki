"use client"

import { Button } from "@/components/ui/button"

import { CardHeader } from "@/components/ui/card"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

// Mock data for news articles - UPDATED
const MOCK_NEWS_ARTICLES = [
  {
    id: "1",
    titre: "Le Street Art Parisien en Pleine Ébullition",
    contenu:
      "Découvrez les dernières fresques murales et les artistes émergents qui transforment les rues de Paris en galeries à ciel ouvert. Des œuvres éphémères aux installations permanentes, le street art parisien ne cesse de surprendre et d'inspirer.",
    long_contenu: `Le street art à Paris est plus vivant que jamais, avec une explosion de créativité qui transforme les murs de la ville en véritables galeries à ciel ouvert. Des quartiers historiques comme le Marais aux zones plus industrielles du 13ème arrondissement, chaque coin de rue peut révéler une nouvelle fresque, un pochoir engagé ou une installation surprenante.

Les artistes parisiens et internationaux utilisent la ville comme toile, abordant des thèmes variés allant de la critique sociale à la célébration de la culture urbaine. Cette forme d'art éphémère, souvent sujette aux intempéries et aux interventions urbaines, témoigne d'une vitalité constante et d'une capacité à se réinventer. Des visites guidées dédiées au street art fleurissent, permettant aux habitants et aux touristes de découvrir ces œuvres souvent cachées et d'en apprendre davantage sur les artistes et leurs messages.

L'impact du street art dépasse l'esthétique ; il participe à la redéfinition de l'identité des quartiers, crée du lien social et offre une plateforme d'expression libre dans un environnement urbain en constante évolution.`,
    image_url: "/placeholder.svg?height=200&width=400",
    tags: "Art,Culture",
    date_publication: "2024-07-01T10:00:00Z",
    id_admin: 1,
    sources: ["https://www.paris.fr/street-art", "https://www.timeout.fr/paris/street-art"],
  },
  {
    id: "2",
    titre: "Les Nouveaux Sons du Hip-Hop Français",
    contenu:
      "Plongez dans l'univers des artistes hip-hop qui redéfinissent le paysage musical français. Entre trap, drill et sonorités plus mélodiques, la scène parisienne est plus diverse que jamais. Interviews exclusives et titres à ne pas manquer.",
    long_contenu: `La scène hip-hop française est en pleine mutation, avec une nouvelle génération d'artistes qui bousculent les codes et explorent de nouvelles sonorités. Loin des clichés, le rap français d'aujourd'hui est un mélange audacieux de trap, de drill, de mélodies R&B et d'influences afro-caribéennes. Paris, en tant que capitale culturelle, est le berceau de nombreux talents émergents qui se distinguent par leur flow unique, leurs textes percutants et leur capacité à innover.

Des collectifs indépendants aux artistes signés par de grands labels, la diversité est le maître mot. Les plateformes de streaming ont joué un rôle crucial en permettant à ces nouveaux sons d'atteindre un public plus large, tandis que les concerts et les open mics continuent de forger l'identité de cette scène vibrante. Des collaborations inattendues et des projets audacieux témoignent de la vitalité et de la créativité sans limites du hip-hop français.`,
    image_url: "/placeholder.svg?height=200&width=400",
    tags: "Musique,Culture",
    date_publication: "2024-06-28T14:30:00Z",
    id_admin: 1,
    sources: ["https://www.booska-p.com/", "https://www.lesinrocks.com/musique/rap/"],
  },
  {
    id: "3",
    titre: "Mode Urbaine : Tendances de l'Été 2024",
    contenu:
      "Explorez les incontournables de la mode urbaine pour cet été. Des sneakers aux coupes oversize, en passant par les accessoires audacieux, Paris dicte les tendances. Conseils de style et marques à suivre absolument.",
    long_contenu: `L'été 2024 marque un tournant pour la mode urbaine, avec des tendances qui allient confort, style et audace. Les sneakers restent au cœur des tenues, mais se parent de couleurs vives et de designs futuristes. Les coupes oversize continuent de dominer, offrant une silhouette décontractée et moderne, tandis que les accessoires, des casquettes aux sacs banane, deviennent des pièces maîtresses pour affirmer son style.

Paris, ville de la mode par excellence, influence fortement ces tendances. Les créateurs indépendants et les marques établies puisent leur inspiration dans les rues, les cultures underground et les mouvements artistiques. Les pop-up stores et les événements éphémères sont des lieux privilégiés pour découvrir les nouveautés et s'approprier les pièces phares de la saison. La mode urbaine n'est plus seulement un style vestimentaire, c'est une expression de soi, un reflet de la personnalité et une manière de se connecter à la culture de la rue.`,
    image_url: "/placeholder.svg?height=200&width=400",
    tags: "Mode",
    date_publication: "2024-06-25T09:15:00Z",
    id_admin: 1,
    sources: ["https://www.vogue.fr/mode", "https://hypebeast.com/fr"],
  },
  {
    id: "4",
    titre: "Battle de Breakdance : Qui sont les Champions de Demain ?",
    contenu:
      "Retour sur les battles de breakdance les plus intenses de la saison. La scène parisienne regorge de talents, et la compétition est féroce. Découvrez les crews qui se démarquent et les mouvements qui font sensation.",
    long_contenu: `La saison des battles de breakdance à Paris a été marquée par des affrontements intenses et des performances à couper le souffle. La capitale française est un vivier de talents, avec des danseurs et des crews qui repoussent constamment les limites de la créativité et de la technique. Des cyphers improvisés dans les parcs aux compétitions officielles dans des salles emblématiques, l'énergie est palpable.

Le breakdance, désormais discipline olympique, gagne en visibilité et attire un public de plus en plus large. Les jeunes talents émergent, apportant de nouvelles figures et une fraîcheur qui dynamise la scène. Les juges ont eu fort à faire pour départager les participants, tant le niveau était élevé. Cet article revient sur les moments forts de la saison, les crews qui ont marqué les esprits et les danseurs à suivre de près pour les prochaines compétitions.`,
    image_url: "/placeholder.svg?height=200&width=400",
    tags: "Danse,Événements",
    date_publication: "2024-06-20T11:45:00Z",
    id_admin: 1,
    sources: ["https://www.redbull.com/fr-fr/tags/breakdance", "https://www.ffdanse.fr/"],
  },
]

export default function NewsPage() {
  const searchParams = useSearchParams()
  const tagsFilter = searchParams.get("tags") || ""

  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    try {
      // Simulate fetching articles with filters
      const filteredArticles = MOCK_NEWS_ARTICLES.filter((article) => {
        if (!tagsFilter || tagsFilter === "Tout") return true
        return article.tags?.includes(tagsFilter)
      })
      setArticles(filteredArticles)
    } catch (err) {
      console.error("Failed to fetch news articles:", err)
      setError("Échec du chargement des articles.")
    } finally {
      setLoading(false)
    }
  }, [tagsFilter])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <p className="text-lg text-muted-foreground">Chargement des actualités...</p>
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
          Actus Street
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground mt-4">
          Plongez au cœur de la culture urbaine parisienne avec nos derniers articles.
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        <Link href="/news" className="text-sm font-medium hover:underline">
          <Badge variant={!tagsFilter || tagsFilter === "Tout" ? "default" : "outline"} className="cursor-pointer">
            Tout
          </Badge>
        </Link>
        {["Mode", "Musique", "Art", "Danse", "Événements", "Culture"].map((tag) => (
          <Link key={tag} href={`/news?tags=${tag}`} className="text-sm font-medium hover:underline">
            <Badge variant={tagsFilter === tag ? "default" : "outline"} className="cursor-pointer">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-muted-foreground text-lg">Aucun article trouvé pour cette catégorie.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
              className="group"
            >
              <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-makiGreen-500/20 dark:border-makiOrange-500/20">
                <Link href={`/news/${article.id}`} className="block">
                  <Image
                    src={article.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={article.titre}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags?.split(",").map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-makiGreen-100 text-makiGreen-800 dark:bg-makiGreen-900 dark:text-makiGreen-200"
                      >
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/news/${article.id}`} className="block">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-makiGreen-600 dark:group-hover:text-makiOrange-400 transition-colors">
                      {article.titre}
                    </CardTitle>
                  </Link>
                  <CardDescription className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {article.contenu}
                  </CardDescription>
                  <p className="mt-3 text-xs text-gray-500">
                    Publié le {new Date(article.date_publication).toLocaleDateString("fr-FR")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
