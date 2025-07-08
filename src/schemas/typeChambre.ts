import { z } from "zod";
 
export const typeChambreSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  prixParNuit: z.number().min(0, "Le prix doit être positif"),
}); 