import { z } from "zod";

export const videoPriveeSchema = z.object({
  url: z.string().url("URL invalide"),
  titre: z.string().min(1, "Le titre est requis"),
  privee: z.boolean().optional(),
  hebergementId: z.string(),
}); 