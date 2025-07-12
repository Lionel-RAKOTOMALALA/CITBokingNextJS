import { z } from 'zod';
import {  protectedProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { TRPCError } from '@trpc/server';

export const homeRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(z.object({
      nom: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
        try {
            const {user} = ctx;
            const { nom } = input;
           
            const updatedUser = await prisma.utilisateur.update({
                where: {
                    id: user.id,
                },
                data: {
                    nom,
                },
            });
            return updatedUser;
        } catch {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "An unexpected error occurred",
            });
        }
    }),
});