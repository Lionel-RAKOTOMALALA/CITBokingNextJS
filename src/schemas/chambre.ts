import { z } from "zod";

export const chambreSchema = z.object({
  numero: z.string().min(1, "Le numéro est requis"),
  disponible: z.boolean().default(true),
  hebergementId: z.string().min(1, "L'hébergement est requis"),
  typeChambreId: z.string().min(1, "Le type de chambre est requis"),
});

export type ChambreFormData = z.infer<typeof chambreSchema>; 