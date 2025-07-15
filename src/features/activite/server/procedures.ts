import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import prisma from '@/db';
import { activiteSchema, activiteUpdateSchema, activiteIdSchema } from '@/schemas/activite';
import { Activite, ActiviteUpdate, ActiviteId } from '@/types/schemas';

export const activiteRouter = createTRPCRouter({
  // Créer une activité
  create: baseProcedure
    .input(activiteSchema)
    .mutation(async ({ input }: { input: Activite }) => {
      return prisma.activite.create({ data: input });
    }),

  // Lister toutes les activités
  list: baseProcedure.query(async () => {
    return prisma.activite.findMany({ orderBy: { nom: 'asc' } });
  }),

  // Récupérer une activité par ID
  get: baseProcedure
    .input(activiteIdSchema)
    .query(async ({ input }: { input: ActiviteId }) => {
      return prisma.activite.findUnique({ where: { id: input.id } });
    }),

  // Mettre à jour une activité
  update: baseProcedure
    .input(activiteUpdateSchema)
    .mutation(async ({ input }: { input: ActiviteUpdate }) => {
      const { id, ...data } = input;
      return prisma.activite.update({ where: { id }, data });
    }),

  // Supprimer une activité
  delete: baseProcedure
    .input(activiteIdSchema)
    .mutation(async ({ input }: { input: ActiviteId }) => {
      return prisma.activite.delete({ where: { id: input.id } });
    }),
}); 