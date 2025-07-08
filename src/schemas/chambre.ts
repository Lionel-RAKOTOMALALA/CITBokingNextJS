import { z } from "zod";

export const chambreSchema = z.object({
  numero: z.string().min(1, "Le numéro est requis"),
  disponible: z.boolean().optional(),
  hebergementId: z.string(),
  typeChambreId: z.string(),
}); 