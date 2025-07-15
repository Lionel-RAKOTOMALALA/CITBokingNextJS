import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { reservationSchema } from '@/schemas/reservation';
import { z } from 'zod';

const reservationIdSchema = z.object({ id: z.string() });
const reservationUpdateSchema = reservationSchema.extend({ id: z.string() });

export const reservationRouter = createTRPCRouter({
  create: baseProcedure.input(reservationSchema).mutation(async ({ input }) =>
    prisma.reservation.create({
      data: {
        ...input,
        dateDebut: new Date(input.dateDebut),
        dateFin: new Date(input.dateFin),
      },
    })
  ),
  list: baseProcedure.query(async () =>
    prisma.reservation.findMany({
      include: {
        utilisateur: true,
        chambre: { include: { hebergement: true, typeChambre: true } },
      },
      orderBy: { dateDebut: "desc" },
    })
  ),
  get: baseProcedure.input(reservationIdSchema).query(async ({ input }) =>
    prisma.reservation.findUnique({
      where: { id: input.id },
      include: {
        utilisateur: true,
        chambre: { include: { hebergement: true, typeChambre: true } },
      },
    })
  ),
  update: baseProcedure.input(reservationUpdateSchema).mutation(async ({ input }) => {
    const { id, ...data } = input;
    return prisma.reservation.update({
      where: { id },
      data: {
        ...data,
        dateDebut: new Date(data.dateDebut),
        dateFin: new Date(data.dateFin),
      },
    });
  }),
  delete: baseProcedure.input(reservationIdSchema).mutation(async ({ input }) =>
    prisma.reservation.delete({ where: { id: input.id } })
  ),
}); 