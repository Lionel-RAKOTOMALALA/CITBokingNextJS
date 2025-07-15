import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { photoSchema } from '@/schemas/photo';
import { z } from 'zod';

export const photoRouter = createTRPCRouter({
  // Créer une photo
  create: baseProcedure
    .input(photoSchema)
    .mutation(async ({ input }) => {
      return prisma.photo.create({ data: input });
    }),

  // Lister toutes les photos
  list: baseProcedure.query(async () => {
    return prisma.photo.findMany({
      include: { hebergement: true },
      orderBy: { id: 'desc' },
    });
  }),

  // Récupérer une photo par ID
  get: baseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return prisma.photo.findUnique({ where: { id: input.id }, include: { hebergement: true } });
  }),

  // Mettre à jour une photo
  update: baseProcedure
    .input(photoSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.photo.update({ where: { id }, data });
    }),

  // Supprimer une photo
  delete: baseProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    return prisma.photo.delete({ where: { id: input.id } });
  }),
}); 