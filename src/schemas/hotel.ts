// src/schema/hotel.ts
import { z } from "zod";

export const hotelSchema = z.object({
  name: z.string().min(1, "Le nom de l'hôtel est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  city: z.string().min(1, "La ville est requise"),
  country: z.string().min(1, "Le pays est requis"),
  stars: z.number().int().min(1).max(5).optional(),
  description: z.string().optional(),
});

export const hotelUpdateSchema = hotelSchema.extend({
  id: z.number(),
});

export const hotelIdSchema = z.object({
  id: z.number(),
});

export type Hotel = z.infer<typeof hotelSchema>;
