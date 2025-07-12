import { z } from "zod"

export const voitureSchema = z.object({
  marque: z.string().min(1, "La marque est requise"),
  modele: z.string().min(1, "Le modèle est requis"),
  prixParJour: z.number().min(0, "Le prix doit être positif"),
  disponible: z.boolean().optional(),
  description: z.string().optional(),
  image: z.string().url("URL invalide"),
}) 