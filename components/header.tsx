"use client"

import Link from "next/link"
import { Moon, Sun, Menu, X, User } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const { setTheme, theme } = useTheme()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { data: session, status } = useSession()

  // Fonction pour générer les éléments de navigation dynamiquement
  // Cette fonction est la seule source de vérité pour les liens de navigation
  const getNavItems = (session: any) => {
    const items = [
      { name: "Accueil", href: "/" },
      { name: "Événements", href: "/events" },
      { name: "Actualités", href: "/news" },
      { name: "À Propos", href: "/about" }, // "À Propos" est toujours visible
    ]

    if (session?.user) {
      // Ces liens sont ajoutés si l'utilisateur est connecté
      items.push({ name: "Soumettre un événement", href: "/submit-event" })
      items.push({ name: "Messagerie", href: "/messages" })
      if (session.user.isAdmin) {
        items.push({ name: "Admin", href: "/admin" })
      }
    }
    return items
  }

  const currentNavItems = getNavItems(session) // Les liens sont générés ici

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/maki.png" alt="Maki Logo" width={310} height={210} className="w-[310px] h-[210px]" priority />
          <span className="sr-only">Maki</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {currentNavItems.map((item) => (
            <Link key={item.name} href={item.href} className="transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Bouton de bascule du thème */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Bouton de connexion/profil pour desktop */}
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || "/placeholder.svg?height=32&width=32"}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback>{session.user.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ redirectTo: "/auth/login" })}>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="icon">
              <Link href="/auth/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Se connecter</span>
              </Link>
            </Button>
          )}

          {/* Navigation mobile */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsSheetOpen(false)}>
                  <Image src="/maki.png" alt="Maki Logo" width={40} height={20} className="w-[40px] h-[20px]" />
                  <span className="sr-only">Maki</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4 p-4 text-lg font-medium flex-1">
                {currentNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-primary"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {session?.user && (
                  <Link href="/profile" className="hover:text-primary" onClick={() => setIsSheetOpen(false)}>
                    Profil
                  </Link>
                )}
                {session?.user ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-lg font-medium hover:text-primary p-0"
                    onClick={() => {
                      signOut({ redirectTo: "/auth/login" })
                      setIsSheetOpen(false)
                    }}
                  >
                    Déconnexion
                  </Button>
                ) : (
                  <Link href="/auth/login" className="hover:text-primary" onClick={() => setIsSheetOpen(false)}>
                    Se connecter
                  </Link>
                )}
              </nav>
              {session?.user && (
                <div className="p-4 border-t flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user.image || "/placeholder.svg?height=40&width=40"}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback>{session.user.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{session.user.name}</p>
                    <p className="text-sm text-muted-foreground">{session.user.email}</p>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
