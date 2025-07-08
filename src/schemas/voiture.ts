import { z } from "zod";

export const voitureSchema = z.object({
  marque: z.string().min(1),
  modele: z.string().min(1),
  prixParJour: z.number().min(0),
  disponible: z.boolean().optional(),
  description: z.string().optional(),
  image: z.string().url("URL invalide"),
}); 