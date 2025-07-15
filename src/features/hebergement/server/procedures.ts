import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { hebergementSchema, hebergementUpdateSchema, hebergementIdSchema } from '@/schemas/hebergement';

export const hebergementRouter = createTRPCRouter({
  create: baseProcedure
    .input(hebergementSchema)
    .mutation(async ({ input }) => prisma.hebergement.create({ data: input })),
  list: baseProcedure
    .query(async () => prisma.hebergement.findMany()),
  get: baseProcedure
    .input(hebergementIdSchema)
    .query(async ({ input }) => prisma.hebergement.findUnique({ where: { id: input.id } })),
  update: baseProcedure
    .input(hebergementUpdateSchema)
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.hebergement.update({ where: { id }, data });
    }),
  delete: baseProcedure
    .input(hebergementIdSchema)
    .mutation(async ({ input }) => prisma.hebergement.delete({ where: { id: input.id } })),
}); 