import { z } from "zod";

export const statutPaiementEnum = z.enum(["EN_ATTENTE", "PAYE", "ANNULE"]);
export const moyenPaiementEnum = z.enum(["VISA", "CONTACT", "PAYPAL", "AUTRE"]);

export const paiementSchema = z.object({
  montant: z.number().positive("Le montant doit être positif"),
  statut: statutPaiementEnum,
  moyenPaiement: moyenPaiementEnum,
  utilisateurId: z.string().uuid(),
  reservationId: z.string().uuid(),
});

export const paiementUpdateSchema = paiementSchema.extend({
  id: z.string().uuid(),
});

export const paiementIdSchema = z.object({
  id: z.string().uuid(),
}); 