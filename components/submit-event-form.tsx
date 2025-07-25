"use client"

import { useFormState } from "react-dom"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link" // Import Link for the toast message

interface SubmitEventFormProps {
  categories: { id: number; nom: string }[]
  submitAction: (prevState: any, formData: FormData) => Promise<{ message: string; errors?: any; event?: any }>
}

export default function SubmitEventForm({ categories, submitAction }: SubmitEventFormProps) {
  const [state, formAction] = useFormState(submitAction, { message: "" })

  useEffect(() => {
    if (state.message) {
      if (state.message === "AUTHENTICATION_REQUIRED") {
        toast({
          title: "Connexion requise",
          description: (
            <>
              Veuillez vous{" "}
              <Link href="/auth/login" className="underline font-semibold">
                connecter
              </Link>{" "}
              pour soumettre un événement.
            </>
          ),
          variant: "destructive",
        })
      } else if (state.errors || state.message.includes("Échec")) {
        toast({
          title: "Erreur",
          description: state.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Succès",
          description: state.message,
          variant: "default",
        })
      }
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="titre">Titre de l'événement</Label>
        <Input id="titre" name="titre" type="text" placeholder="Concert de rap underground" required />
        {state.errors?.titre && <p className="text-destructive text-sm mt-1">{state.errors.titre}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Décrivez votre événement en détail..."
          rows={5}
          required
        />
        {state.errors?.description && <p className="text-destructive text-sm mt-1">{state.errors.description}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="lieu">Lieu</Label>
          <Input id="lieu" name="lieu" type="text" placeholder="Nom du lieu ou adresse" required />
          {state.errors?.lieu && <p className="text-destructive text-sm mt-1">{state.errors.lieu}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="date_evenement">Date et heure</Label>
          <Input id="date_evenement" name="date_evenement" type="datetime-local" required />
          {state.errors?.date_evenement && (
            <p className="text-destructive text-sm mt-1">{state.errors.date_evenement}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="id_categorie">Catégorie</Label>
        <Select name="id_categorie">
          <SelectTrigger id="id_categorie">
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.errors?.id_categorie && <p className="text-destructive text-sm mt-1">{state.errors.id_categorie}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image_file">Image de l'événement (optionnel)</Label>
        <Input id="image_file" name="image_file" type="file" accept="image/*" /> {/* Changed to type="file" */}
        {state.errors?.image_file && <p className="text-destructive text-sm mt-1">{state.errors.image_file}</p>}
      </div>

      {/* Fixed price for the event */}
      <div className="space-y-2">
        <Label htmlFor="prix">Prix</Label>
        <Input id="prix" name="prix" type="text" value="15.00 EUR" disabled className="font-semibold" />
        {/* Hidden input to pass the actual price value */}
        <input type="hidden" name="prix" value="15.00" />
      </div>

      {/* Payment method selection */}
      <div className="space-y-2">
        <Label htmlFor="payment_method">Mode de paiement</Label>
        <Select name="payment_method" required>
          <SelectTrigger id="payment_method">
            <SelectValue placeholder="Sélectionnez un mode de paiement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit_card">Carte de crédit</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.payment_method && <p className="text-destructive text-sm mt-1">{state.errors.payment_method}</p>}
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-makiGreen-500 to-makiOrange-500 text-white font-semibold py-2 rounded-md hover:from-makiGreen-600 hover:to-makiOrange-600 transition-all duration-300"
      disabled={pending}
    >
      {pending ? "Soumission en cours..." : "Soumettre l'événement (15€)"}
    </Button>
  )
}
