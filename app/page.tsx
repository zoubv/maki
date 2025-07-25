"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden py-12 md:py-24 lg:py-32">
      {/* Artistic background element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/IMG_9280.PNG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(80px) grayscale(50%)",
          opacity: 0.1,
        }}
      />

      <div className="container relative z-10 flex flex-col items-center justify-center gap-6 px-4 text-center md:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-orange-500">
            Maki : Le Cœur de la Culture Urbaine Parisienne
          </h1>
        </motion.div>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="max-w-[700px] text-lg text-muted-foreground md:text-xl"
        >
          Découvrez les événements, les actualités et connectez-vous avec la communauté qui fait vibrer les rues de
          Paris.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-green-500 to-orange-600 text-white hover:from-green-600 hover:to-orange-700"
          >
            <Link href="/events">Explorer les Événements</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-500 dark:hover:text-white bg-transparent"
          >
            <Link href="/news">Lire les Actualités</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
