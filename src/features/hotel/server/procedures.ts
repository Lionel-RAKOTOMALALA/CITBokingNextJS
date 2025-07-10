import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { hotelSchema, hotelUpdateSchema, hotelIdSchema } from '@/schemas/hotel';

export const hotelRouter = createTRPCRouter({
  // Créer un hôtel
  create: baseProcedure
    .input(hotelSchema)
    .mutation(async ({ input }) => {
      return prisma.hotel.create({ data: input });
    }),

  // Lister tous les hôtels
  list: baseProcedure
    .query(async () => {
      return prisma.hotel.findMany();
    }),

  // Récupérer un hôtel par ID
  get: baseProcedure
    .input(hotelIdSchema)
    .query(async ({ input }) => {
      return prisma.hotel.findUnique({ where: { id: input.id } });
    }),

  // Mettre à jour un hôtel
  update: baseProcedure
    .input(hotelUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.hotel.update({ where: { id }, data });
    }),

  // Supprimer un hôtel
  delete: baseProcedure
    .input(hotelIdSchema)
    .mutation(async ({ input }) => {
      return prisma.hotel.delete({ where: { id: input.id } });
    }),
}); 