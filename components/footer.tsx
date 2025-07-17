"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      className="w-full bg-gradient-to-r from-makiGreen-800 to-makiOrange-800 text-white py-8 md:py-12"
    >
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-makiGreen-300">Maki</h3>
          <p className="text-sm text-makiGreen-100">Votre guide de la culture urbaine parisienne.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-makiGreen-100 hover:text-white transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-makiGreen-100 hover:text-white transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-makiGreen-100 hover:text-white transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-makiGreen-300">Navigation</h3>
          <nav className="space-y-2 text-sm">
            <Link href="/" className="block text-makiGreen-100 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="/events" className="block text-makiGreen-100 hover:text-white transition-colors">
              Événements
            </Link>
            <Link href="/news" className="block text-makiGreen-100 hover:text-white transition-colors">
              Actualités
            </Link>
            <Link href="/submit-event" className="block text-makiGreen-100 hover:text-white transition-colors">
              Soumettre un événement
            </Link>
            <Link href="/about" className="block text-makiGreen-100 hover:text-white transition-colors">
              À Propos
            </Link>{" "}
            {/* Added About link */}
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-makiGreen-300">Légal</h3>
          <nav className="space-y-2 text-sm">
            <Link href="#" className="block text-makiGreen-100 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="block text-makiGreen-100 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
          </nav>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-makiGreen-300">Contact</h3>
          <p className="text-sm text-makiGreen-100">
            Email: contact@maki.com
            <br />
            Téléphone: +33 1 23 45 67 89
          </p>
        </div>
      </div>
      <div className="mt-8 border-t border-makiGreen-700 pt-4 text-center text-sm text-makiGreen-200">
        &copy; {new Date().getFullYear()} Maki. Tous droits réservés.
      </div>
    </motion.footer>
  )
}
