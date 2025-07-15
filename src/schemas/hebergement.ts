import { z } from "zod";
 
export const hebergementSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  localisation: z.string().min(1, "La localisation est requise"),
});

export const hebergementUpdateSchema = hebergementSchema.extend({
  id: z.string().uuid(),
});

export const hebergementIdSchema = z.object({
  id: z.string().uuid(),
}); 