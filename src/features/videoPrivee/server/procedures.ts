import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { videoPriveeSchema } from '@/schemas/videoPrivee';
import { z } from 'zod';

export const videoPriveeRouter = createTRPCRouter({
  create: baseProcedure
    .input(videoPriveeSchema)
    .mutation(async ({ input }) => {
      return prisma.videoPrivee.create({ data: input });
    }),

  list: baseProcedure.query(async () => {
    return prisma.videoPrivee.findMany({
      include: { hebergement: true },
      orderBy: { createdAt: 'desc' },
    });
  }),

  get: baseProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return prisma.videoPrivee.findUnique({ where: { id: input.id }, include: { hebergement: true } });
  }),

  update: baseProcedure
    .input(videoPriveeSchema.extend({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.videoPrivee.update({ where: { id }, data });
    }),

  delete: baseProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    return prisma.videoPrivee.delete({ where: { id: input.id } });
  }),
}); 