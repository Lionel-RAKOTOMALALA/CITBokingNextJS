import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide!"),
  clerkUserId: z.string().min(1, "L'identifiant Clerk est requis"),
});

// Pour utiliser le type TypeScript correspondant :
export type User = z.infer<typeof userSchema>;