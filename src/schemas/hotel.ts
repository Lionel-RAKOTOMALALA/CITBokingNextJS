// src/schema/hotel.ts
import { z } from "zod";

export const hotelSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  description: z.string(),
  localisation: z.string().min(1, "La localisation est requise"),
});

export const hotelUpdateSchema = hotelSchema.extend({
  id: z.string().uuid(),
});

export const hotelIdSchema = z.object({
  id: z.string().uuid(),
});
