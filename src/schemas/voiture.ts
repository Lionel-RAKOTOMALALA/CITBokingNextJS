import { z } from "zod";

// Schéma pour créer une voiture
export const voitureSchema = z.object({
  marque: z.string().min(1),
  modele: z.string().min(1),
  prixParJour: z.number().positive(),
  disponible: z.boolean().optional().default(true),
  description: z.string().min(1),
  image: z.string().min(1),
});

// Schéma pour mettre à jour une voiture
export const voitureUpdateSchema = voitureSchema.extend({
  id: z.string().uuid(),
});

// Schéma pour l'ID d'une voiture
export const voitureIdSchema = z.object({
  id: z.string().uuid(),
});