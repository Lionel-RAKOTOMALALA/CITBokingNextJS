import { z } from "zod";

export const reservationSchema = z.object({
  dateDebut: z.string(), // ou z.coerce.date() si tu veux parser
  dateFin: z.string(),
  nombrePersonnes: z.number().min(1),
  utilisateurId: z.string(),
  chambreId: z.string(),
}); 