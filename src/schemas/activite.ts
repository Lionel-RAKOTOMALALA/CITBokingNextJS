import { z } from "zod";

export const activiteSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string().min(1, "La description est requise"),
  prixParPersonne: z.number().positive("Le prix doit être positif"),
  localisation: z.string().min(1, "La localisation est requise"),
  image: z.string().url("L'image doit être une URL valide"),
});

export const activiteUpdateSchema = activiteSchema.extend({
  id: z.string().uuid(),
});

export const activiteIdSchema = z.object({
  id: z.string().uuid(),
}); 