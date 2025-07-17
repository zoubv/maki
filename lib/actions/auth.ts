"use server"

import { signIn, signOut } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
})

const registerSchema = z.object({
  pseudo: z.string().min(3, { message: "Le pseudo doit contenir au moins 3 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
})

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
      return (
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        validatedFields.error.flatten().fieldErrors.password?.[0] ||
        "Erreur de validation."
      )
    }

    // Simulate authentication
    await signIn("credentials", {
      ...validatedFields.data,
      redirectTo: "/", // Redirect to home page after successful login
    })
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "Identifiants invalides. (Email: admin@maki.com, creator@maki.com, user@maki.com | Pass: password)"
    }
    throw error
  }
}

export async function register(prevState: string | undefined, formData: FormData) {
  try {
    const validatedFields = registerSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validatedFields.success) {
      return (
        validatedFields.error.flatten().fieldErrors.pseudo?.[0] ||
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        validatedFields.error.flatten().fieldErrors.password?.[0] ||
        "Erreur de validation."
      )
    }

    const { pseudo, email, password } = validatedFields.data

    // Simulate user creation (no actual persistence)
    console.log(`Simulating new user registration: ${pseudo}, ${email}, ${password}`)

    // Removed automatic signIn after registration.
    // The client component will now display a toast with a link to login.
    return "Inscription réussie ! Vous pouvez maintenant vous connecter."
  } catch (error) {
    console.error("Registration error:", error)
    return "Échec de l'inscription. Veuillez réessayer. (La création de compte est simulée, utilisez les comptes existants pour la connexion)"
  }
}

export async function logout() {
  await signOut({ redirectTo: "/auth/login" })
}
