import { z } from "zod";

export const reservationSchema = z.object({
  dateDebut: z.string().min(1, "La date de début est requise"), // à parser en Date côté backend si besoin
  dateFin: z.string().min(1, "La date de fin est requise"),
  nombrePersonnes: z.number().int().min(1, "Le nombre de personnes doit être au moins 1"),
  utilisateurId: z.string().min(1, "L'utilisateur est requis"),
  chambreId: z.string().min(1, "La chambre est requise"),
});

export type ReservationFormData = z.infer<typeof reservationSchema>; 