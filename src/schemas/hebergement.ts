import { z } from "zod";

export const hebergementSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  localisation: z.string().min(1, "La localisation est requise"),
}); 