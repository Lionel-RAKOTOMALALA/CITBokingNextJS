import { z } from "zod";
import { voitureSchema, voitureUpdateSchema, voitureIdSchema } from "@/schemas/voiture";
import { hebergementSchema } from "@/schemas/hebergement";
import { utilisateurSchema } from "@/schemas/utilisateur";
import { userSchema } from "@/schemas/user";
import { hotelSchema, hotelUpdateSchema, hotelIdSchema } from "@/schemas/hotel";
import { reservationSchema } from "@/schemas/reservation";
import { chambreSchema } from "@/schemas/chambre";
import { activiteSchema } from "@/schemas/activite";
import { typeChambreSchema } from "@/schemas/typeChambre";
import { videoPriveeSchema } from "@/schemas/videoPrivee";
import { photoSchema } from "@/schemas/photo";
import { paiementSchema } from "@/schemas/paiement";

// ===== TYPES VOITURE =====
export type Voiture = z.infer<typeof voitureSchema>;
export type VoitureUpdate = z.infer<typeof voitureUpdateSchema>;
export type VoitureId = z.infer<typeof voitureIdSchema>;

// ===== TYPES HEBERGEMENT =====
export type Hebergement = z.infer<typeof hebergementSchema>;

// ===== TYPES UTILISATEUR =====
export type Utilisateur = z.infer<typeof utilisateurSchema>;
export type User = z.infer<typeof userSchema>;

// ===== TYPES HOTEL =====
export type Hotel = z.infer<typeof hotelSchema>;
export type HotelUpdate = z.infer<typeof hotelUpdateSchema>;
export type HotelId = z.infer<typeof hotelIdSchema>;

// ===== TYPES RESERVATION =====
export type Reservation = z.infer<typeof reservationSchema>;

// ===== TYPES CHAMBRE =====
export type Chambre = z.infer<typeof chambreSchema>;

// ===== TYPES ACTIVITE =====
export type Activite = z.infer<typeof activiteSchema>;

// ===== TYPES TYPE CHAMBRE =====
export type TypeChambre = z.infer<typeof typeChambreSchema>;

// ===== TYPES VIDEO PRIVEE =====
export type VideoPrivee = z.infer<typeof videoPriveeSchema>;

// ===== TYPES PHOTO =====
export type Photo = z.infer<typeof photoSchema>;

// ===== TYPES PAIEMENT =====
export type Paiement = z.infer<typeof paiementSchema>;

// ===== TYPES PRISMA (pour les retours de base de données) =====
// Ces types incluent les champs générés par Prisma (id, createdAt, etc.)
export type PrismaVoiture = {
  id: string;
  marque: string;
  modele: string;
  prixParJour: number;
  disponible: boolean;
  description: string;
  image: string;
};

export type PrismaHebergement = {
  id: string;
  nom: string;
  description: string;
  localisation: string;
  createdAt: Date;
};

export type PrismaUtilisateur = {
  id: string;
  nom: string;
  email: string;
  motDePasse: string;
  role: "CLIENT" | "ADMIN" | "GESTIONNAIRE";
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | null;
};

export type PrismaReservation = {
  id: string;
  dateDebut: Date;
  dateFin: Date;
  nombrePersonnes: number;
  createdAt: Date;
  utilisateurId: string;
  chambreId: string;
};

export type PrismaChambre = {
  id: string;
  numero: string;
  disponible: boolean;
  hebergementId: string;
  typeChambreId: string;
};

export type PrismaActivite = {
  id: string;
  nom: string;
  description: string;
  prixParPersonne: number;
  localisation: string;
  image: string;
};

export type PrismaTypeChambre = {
  id: string;
  nom: string;
  description: string;
};

export type PrismaVideoPrivee = {
  id: string;
  url: string;
  titre: string;
  privee: boolean;
  hebergementId: string;
};

export type PrismaPhoto = {
  id: string;
  url: string;
  hebergementId: string;
};

export type PrismaPaiement = {
  id: string;
  montant: number;
  statut: "EN_ATTENTE" | "PAYE" | "ANNULE";
  moyenPaiement: "VISA" | "CONTACT" | "PAYPAL" | "AUTRE";
  createdAt: Date;
  utilisateurId: string;
  reservationId: string;
};

// ===== UTILITAIRES DE TYPES =====
// Pour extraire le type de retour d'une procédure tRPC
export type ProcedureReturn<T> = T extends (...args: any[]) => infer R ? R : never;

// Pour extraire le type d'entrée d'une procédure tRPC
export type ProcedureInput<T> = T extends (input: infer I) => any ? I : never;

// Pour les listes avec relations Prisma
export type WithRelations<T, R extends keyof T> = T & {
  [K in R]: T[K] extends (infer U)[] ? U[] : T[K];
};

// Exemple d'utilisation:
// type VoitureWithReservations = WithRelations<PrismaVoiture, 'reservations'>; 