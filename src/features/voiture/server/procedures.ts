import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { voitureSchema, voitureUpdateSchema, voitureIdSchema } from '@/schemas/voiture';
import { PrismaVoiture, Voiture, VoitureUpdate, VoitureId } from '@/types/schemas';

export const voitureRouter = createTRPCRouter({
  // Créer une voiture
  // Input: Voiture (type infer du schema Zod)
  // Output: PrismaVoiture (type avec id, createdAt, etc.)
  create: baseProcedure
    .input(voitureSchema)
    .mutation(async ({ input }: { input: Voiture }): Promise<PrismaVoiture> => {
      return prisma.voiture.create({ data: input });
    }),

  // Lister toutes les voitures
  // Output: PrismaVoiture[] (liste des voitures avec tous les champs Prisma)
  list: baseProcedure
    .query(async (): Promise<PrismaVoiture[]> => {
      return prisma.voiture.findMany();
    }),

  // Récupérer une voiture par ID
  // Input: VoitureId (type infer du schema Zod)
  // Output: PrismaVoiture | null
  get: baseProcedure
    .input(voitureIdSchema)
    .query(async ({ input }: { input: VoitureId }): Promise<PrismaVoiture | null> => {
      return prisma.voiture.findUnique({ where: { id: input.id } });
    }),

  // Mettre à jour une voiture
  // Input: VoitureUpdate (type infer du schema Zod avec id)
  // Output: PrismaVoiture
  update: baseProcedure
    .input(voitureUpdateSchema)
    .mutation(async ({ input }: { input: VoitureUpdate }): Promise<PrismaVoiture> => {
      const { id, ...data } = input;
      return prisma.voiture.update({ where: { id }, data });
    }),

  // Supprimer une voiture
  // Input: VoitureId (type infer du schema Zod)
  // Output: PrismaVoiture
  delete: baseProcedure
    .input(voitureIdSchema)
    .mutation(async ({ input }: { input: VoitureId }): Promise<PrismaVoiture> => {
      return prisma.voiture.delete({ where: { id: input.id } });
    }),
});