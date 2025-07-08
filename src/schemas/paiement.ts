import { z } from "zod";

export const paiementSchema = z.object({
  montant: z.number().min(0),
  statut: z.enum(["EN_ATTENTE", "PAYE", "ANNULE"]),
  moyenPaiement: z.enum(["VISA", "CONTACT", "PAYPAL", "AUTRE"]),
  utilisateurId: z.string(),
  reservationId: z.string(),
}); 