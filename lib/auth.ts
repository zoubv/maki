import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import type { NextAuthConfig } from "next-auth"

// Mock user data for demonstration without a database
const MOCK_USERS = [
  {
    id: "1",
    pseudo: "maki_admin",
    email: "admin@maki.com",
    mot_de_passe: "$2a$10$yF.0.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1", // Hashed 'password'
    bio: "Administrateur de Maki.",
    avatar_url: "/placeholder.svg?height=96&width=96",
    est_createur: true,
    est_premium: true,
    isAdmin: true, // Custom field for admin role
  },
  {
    id: "2",
    pseudo: "createur_maki",
    email: "creator@maki.com",
    mot_de_passe: "$2a$10$yF.0.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1", // Hashed 'password'
    bio: "Créateur d'événements urbains.",
    avatar_url: "/placeholder.svg?height=96&width=96",
    est_createur: true,
    est_premium: false,
    isAdmin: false,
  },
  {
    id: "3",
    pseudo: "utilisateur_simple",
    email: "user@maki.com",
    mot_de_passe: "$2a$10$yF.0.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1.2.3.4.5.6.7.8.9.0.1", // Hashed 'password'
    bio: "Passionné de culture urbaine.",
    avatar_url: "/placeholder.svg?height=96&width=96",
    est_createur: false,
    est_premium: false,
    isAdmin: false,
  },
]

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          const dbUser = MOCK_USERS.find((user) => user.email === email)

          if (!dbUser) return null

          const passwordsMatch = password === "password"

          if (passwordsMatch) {
            return {
              id: dbUser.id.toString(),
              email: dbUser.email,
              name: dbUser.pseudo,
              image: dbUser.avatar_url, // <-- AJOUTÉ : Propager l'avatar_url comme image
              isCreator: dbUser.est_createur,
              isPremium: dbUser.est_premium,
              isAdmin: dbUser.isAdmin,
            }
          }
        }
        console.log("Invalid credentials")
        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isCreator = (user as any).isCreator
        token.isPremium = (user as any).isPremium
        token.isAdmin = (user as any).isAdmin
        token.picture = user.image // <-- AJOUTÉ : Propager l'image vers le token.picture
      }
      return token
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string
        session.user.isCreator = token.isCreator as boolean
        session.user.isPremium = token.isPremium as boolean
        session.user.isAdmin = token.isAdmin as boolean
        session.user.image = token.picture // <-- AJOUTÉ : Propager le token.picture vers session.user.image
      }
      return session
    },
  },
} satisfies NextAuthConfig

// Destructure handlers directly from NextAuth(authConfig)
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Extend the Session and JWT types to include custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      isCreator?: boolean
      isPremium?: boolean
      isAdmin?: boolean
    }
  }

  interface User {
    id: string
    email: string
    name: string
    image?: string | null // <-- AJOUTÉ : Ajouter image à l'interface User
    isCreator: boolean
    isPremium: boolean
    isAdmin: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    isCreator?: boolean
    isPremium?: boolean
    isAdmin?: boolean
    picture?: string | null // <-- AJOUTÉ : Ajouter picture au JWT
  }
}
