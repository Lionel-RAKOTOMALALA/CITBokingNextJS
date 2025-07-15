import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { chambreSchema } from '@/schemas/chambre';
import { z } from 'zod';

const chambreIdSchema = z.object({ id: z.string() });
const chambreUpdateSchema = chambreSchema.extend({ id: z.string() });

export const chambreRouter = createTRPCRouter({
  create: baseProcedure.input(chambreSchema).mutation(async ({ input }) =>
    prisma.chambre.create({ data: input })
  ),
  list: baseProcedure.query(async () =>
    prisma.chambre.findMany({
      include: {
        hebergement: true,
        typeChambre: true,
      },
    })
  ),
  get: baseProcedure.input(chambreIdSchema).query(async ({ input }) =>
    prisma.chambre.findUnique({
      where: { id: input.id },
      include: {
        hebergement: true,
        typeChambre: true,
      },
    })
  ),
  update: baseProcedure.input(chambreUpdateSchema).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return prisma.chambre.update({ where: { id }, data });
  }),
  delete: baseProcedure.input(chambreIdSchema).mutation(async ({ input }) =>
    prisma.chambre.delete({ where: { id: input.id } })
  ),
}); 