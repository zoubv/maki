"use server"

import { auth } from "@/lib/auth"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const profileSchema = z.object({
  pseudo: z.string().min(3, { message: "Le pseudo doit contenir au moins 3 caractères." }).optional(),
  bio: z.string().max(500, { message: "La bio ne doit pas dépasser 500 caractères." }).optional(),
  avatar_url: z.string().url({ message: "L'URL de l'avatar doit être valide." }).optional().or(z.literal("")),
})

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { message: "Non authentifié." }
  }

  const validatedFields = profileSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erreur de validation.",
    }
  }

  const { pseudo, bio, avatar_url } = validatedFields.data

  try {
    // Simulate profile update (no actual persistence)
    console.log(`Simulating profile update for user ${session.user.id}:`, { pseudo, bio, avatar_url })

    // In a real app, you'd update the database here.
    // For now, we return a mock updated user object.
    const updatedUser = {
      id: session.user.id,
      pseudo: pseudo || session.user.name,
      email: session.user.email,
      bio: bio === "" ? null : bio,
      avatar_url: avatar_url === "" ? null : avatar_url,
      est_createur: session.user.isCreator,
      est_premium: session.user.isPremium,
    }

    revalidatePath("/profile")
    return { message: "Profil mis à jour avec succès ! (Simulé)", user: updatedUser }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { message: "Échec de la mise à jour du profil. (Simulé)" }
  }
}
