// Export tous les types de schémas
export * from './schemas';

// Types utilitaires pour tRPC
export type {
  ProcedureReturn,
  ProcedureInput,
  WithRelations
} from './schemas';

// Types pour les retours de base de données Prisma
export type {
  PrismaVoiture,
  PrismaHebergement,
  PrismaUtilisateur,
  PrismaReservation,
  PrismaChambre,
  PrismaActivite,
  PrismaTypeChambre,
  PrismaVideoPrivee,
  PrismaPhoto,
  PrismaPaiement
} from './schemas';

// Types pour les entrées de formulaires (Zod schemas)
export type {
  Voiture,
  VoitureUpdate,
  VoitureId,
  Hebergement,
  Utilisateur,
  User,
  Hotel,
  HotelUpdate,
  HotelId,
  Reservation,
  Chambre,
  Activite,
  TypeChambre,
  VideoPrivee,
  Photo,
  Paiement
} from './schemas'; 