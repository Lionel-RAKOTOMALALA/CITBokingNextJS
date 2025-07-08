import { z } from "zod";

export const activiteSchema = z.object({
  nom: z.string().min(1),
  description: z.string().optional(),
  prixParPersonne: z.number().min(0),
  localisation: z.string().min(1),
  image: z.string().url("URL invalide"),
}); 