import { z } from "zod";
 
export const typeChambreSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  capaciteMax: z.number().int().min(1, "La capacité maximale doit être au moins 1"),
});

export type TypeChambreFormData = z.infer<typeof typeChambreSchema>; 