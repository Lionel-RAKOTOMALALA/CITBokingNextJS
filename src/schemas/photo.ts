import { z } from "zod";
 
export const photoSchema = z.object({
  url: z.string().url("URL invalide"),
  hebergementId: z.string(),
}); 