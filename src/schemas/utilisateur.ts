import { z } from "zod";

export const utilisateurSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  motDePasse: z.string().min(6, "Mot de passe trop court"),
  role: z.enum(["CLIENT", "ADMIN", "GESTIONNAIRE"]).optional(),
  clerkUserId: z.string().min(1, "L'identifiant Clerk est requis"),
}); 