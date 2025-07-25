"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Sparkles, Heart, Users } from "lucide-react" // Added more expressive icons

export default function AboutPage() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10, delay: 0.3 } },
  }

  // Animation pour les "blobs" de fond flottants
  const blobAnimation = (delay: number, duration: number, rotate: number) => ({
    initial: { opacity: 0, scale: 0.5, rotate: 0 },
    animate: {
      opacity: [0.1, 0.2, 0.15, 0.1], // Changements subtils d'opacité
      scale: [0.8, 1.2, 0.9, 1.1, 0.8], // Échelle pulsante
      rotate: [0, rotate / 4, rotate / 2, rotate * 0.75, rotate], // Rotation
    },
    transition: {
      duration: duration,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay,
    },
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-8 px-4 md:px-6 lg:py-12"
    >
      {/* Éléments artistiques de fond (blobs) - Plus nombreux, plus dynamiques */}
      <motion.div
        {...blobAnimation(0, 20, 360)}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-makiGreen-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <motion.div
        {...blobAnimation(1.5, 25, -360)}
        className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-makiOrange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <motion.div
        {...blobAnimation(0.8, 18, 270)}
        className="absolute top-1/2 left-1/3 w-56 h-56 bg-makiGreen-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
      <motion.div
        {...blobAnimation(2.5, 22, -270)}
        className="absolute bottom-1/4 left-1/2 w-60 h-60 bg-makiOrange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />

      <motion.div variants={textVariants} className="text-center mb-10 relative z-10">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-makiGreen-500 to-makiOrange-500">
          Maki : Ton Spot Urbain à Paris !
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground mt-4">
          Oublie les guides barbants, on te plonge au cœur de la culture street parisienne. Prêt à kiffer ?
        </p>
      </motion.div>

      {/* Conteneur principal du contenu - moins "carte" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto p-6 rounded-3xl shadow-2xl bg-background/80 backdrop-blur-sm border border-makiGreen-500/20 dark:border-makiOrange-500/20 relative z-10"
      >
        <div className="space-y-6 text-lg leading-relaxed">
          <motion.p variants={textVariants}>
            Chez Maki, on est à fond sur la culture urbaine de Paris. On veut que tu trouves tous les bons plans, que tu
            rencontres des gens stylés et que tu vibes avec l'énergie de la ville. C'est notre mission : te connecter à
            tout ce qui bouge, tout ce qui est frais, tout ce qui fait Paris, Paris.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="bg-makiGreen-50 dark:bg-makiOrange-950 p-4 rounded-2xl border border-makiGreen-100 dark:border-makiOrange-800"
          >
            <h3 className="text-xl font-semibold text-makiGreen-700 dark:text-makiOrange-400 mb-2 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-makiOrange-500 dark:text-makiGreen-500" />
              Une Vibe Née de la Passion !
            </h3>
            <p>
              Maki, c'est l'idée folle de deux potes,{" "}
              <span className="font-bold text-makiGreen-800 dark:text-makiOrange-300">Goldunit</span> et{" "}
              <span className="font-bold text-makiGreen-800 dark:text-makiOrange-300">Canis</span>. Ils ont eu cette
              étincelle : créer un truc où l'art de la rue, la musique qui fait bouger, la danse qui te prend aux
              tripes, et la mode qui te rend unique, tout ça se rencontre.
            </p>
            <p className="mt-2">
              <motion.span variants={iconVariants} className="inline-block mr-2">
                <Heart className="h-5 w-5 text-red-500 inline-block" />
              </motion.span>
              Canis, avec sa touche artistique inimitable et son œil pour le détail qui claque, et{" "}
              <motion.span variants={iconVariants} className="inline-block mr-2">
                <Users className="h-5 w-5 text-blue-500 inline-block" />
              </motion.span>
              Goldunit, avec son énergie de dingue et son sens de la communauté, ont mis toute leur passion pour que
              Maki devienne ton QG pour la culture urbaine. C'est leur bonne humeur et leur vision qui ont donné vie à
              cette plateforme, pour que chacun puisse s'exprimer et trouver sa place dans le game parisien.
            </p>
          </motion.div>

          <motion.p variants={textVariants}>
            On croit à fond au pouvoir de la communauté et à l'importance de soutenir les initiatives locales. Alors,
            rejoins la team ! Découvre, partage, et fais vibrer Paris avec nous. La rue t'attend !
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mt-8 text-center relative z-10"
      >
        <Link href="/" className="inline-flex items-center text-primary hover:underline">
          <Home className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>
      </motion.div>
    </motion.div>
  )
}
