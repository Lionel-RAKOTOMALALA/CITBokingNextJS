import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { typeChambreSchema } from '@/schemas/typeChambre';
import { z } from 'zod';

const typeChambreIdSchema = z.object({ id: z.string() });
const typeChambreUpdateSchema = typeChambreSchema.extend({ id: z.string() });

export const typeChambreRouter = createTRPCRouter({
  create: baseProcedure.input(typeChambreSchema).mutation(async ({ input }) => prisma.typeChambre.create({ data: input })),
  list: baseProcedure.query(async () => prisma.typeChambre.findMany()),
  get: baseProcedure.input(typeChambreIdSchema).query(async ({ input }) => prisma.typeChambre.findUnique({ where: { id: input.id } })),
  update: baseProcedure.input(typeChambreUpdateSchema).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return prisma.typeChambre.update({ where: { id }, data });
  }),
  delete: baseProcedure.input(typeChambreIdSchema).mutation(async ({ input }) => prisma.typeChambre.delete({ where: { id: input.id } })),
}); 