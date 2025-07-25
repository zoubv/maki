"use server"

import { auth } from "@/lib/auth"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const eventSchema = z.object({
  titre: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères." }),
  description: z.string().min(20, { message: "La description doit contenir au moins 20 caractères." }),
  lieu: z.string().min(3, { message: "Le lieu est requis." }),
  date_evenement: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "La date de l'événement est invalide.",
  }),
  prix: z.string().transform((val) => Number.parseFloat(val)),
  id_categorie: z
    .string()
    .optional()
    .transform((val) => (val ? Number.parseInt(val) : undefined)),
  // Changed from image_url to image_file, expecting a File object
  image_file: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "L'image est requise." })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: "La taille de l'image ne doit pas dépasser 5MB." })
    .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
      message: "Seuls les formats JPG, PNG et WEBP sont acceptés.",
    })
    .optional(), // Make it optional if no file is selected
  payment_method: z.enum(["credit_card", "paypal", "bank_transfer"], {
    message: "Veuillez sélectionner un mode de paiement valide.",
  }),
})

export async function submitEvent(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { message: "AUTHENTICATION_REQUIRED" }
  }

  const rawFormData = {
    titre: formData.get("titre"),
    description: formData.get("description"),
    lieu: formData.get("lieu"),
    date_evenement: formData.get("date_evenement"),
    prix: formData.get("prix"),
    id_categorie: formData.get("id_categorie"),
    image_file: formData.get("image_file"), // Get the File object
    payment_method: formData.get("payment_method"),
  }

  const validatedFields = eventSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    // Map errors for image_file to image_url for consistency with previous toasts if needed
    const errors = validatedFields.error.flatten().fieldErrors
    if (errors.image_file) {
      errors.image_url = errors.image_file // Use image_url for display purposes
      delete errors.image_file
    }
    return {
      errors: errors,
      message: "Erreur de validation. Veuillez vérifier les champs.",
    }
  }

  const { titre, description, lieu, date_evenement, id_categorie, image_file, payment_method } = validatedFields.data

  const eventDate = new Date(date_evenement)
  const creatorId = Number.parseInt(session.user.id)
  const fixedPrice = 15.0

  let statut = "en_attente"
  if (session.user.isPremium) {
    statut = "approuve"
  }

  try {
    console.log(`Simulating payment of ${fixedPrice} EUR via ${payment_method} for event "${titre}".`)

    // Simulate image upload: use a placeholder URL
    let imageUrl = "/placeholder.svg?height=200&width=400" // Default placeholder
    if (image_file) {
      console.log(`Simulating upload of image: ${image_file.name} (${image_file.size} bytes, ${image_file.type})`)
      // In a real app, you would upload the file to a storage service (e.g., Vercel Blob, S3)
      // and get a public URL. For this mock, we just acknowledge it.
      // You could potentially generate a temporary blob URL on the client if you wanted to preview it.
      // For now, we'll just use a generic placeholder to indicate an image was "uploaded".
      imageUrl = "/placeholder.svg?height=400&width=800" // A slightly larger placeholder for uploaded images
    }

    const newEvent = {
      id: Math.random().toString(36).substring(2, 11),
      titre,
      description,
      lieu,
      date_evenement: eventDate.toISOString(),
      est_gratuit: false,
      prix: fixedPrice,
      id_categorie: id_categorie || null,
      image_url: imageUrl, // Use the simulated image URL
      id_createur: creatorId,
      statut,
      date_soumission: new Date().toISOString(),
    }
    console.log("Simulating new event submission:", newEvent)

    revalidatePath("/events")
    revalidatePath("/submit-event")
    return {
      message: `Événement soumis avec succès ! Paiement de ${fixedPrice}€ via ${payment_method} simulé.`,
      event: newEvent,
    }
  } catch (error) {
    console.error("Error submitting event:", error)
    return { message: "Échec de la soumission de l'événement. (Simulé)" }
  }
}
