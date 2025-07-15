import { createTRPCRouter, baseProcedure } from '@/trpc/init';
import prisma from '@/db';
import { paiementSchema, paiementUpdateSchema, paiementIdSchema } from '@/schemas/paiement';
import { Paiement, PaiementUpdate, PaiementId } from '@/types/schemas';

export const paiementRouter = createTRPCRouter({
  // Créer un paiement
  create: baseProcedure
    .input(paiementSchema)
    .mutation(async ({ input }: { input: Paiement }) => {
      return prisma.paiement.create({ data: input });
    }),

  // Lister tous les paiements
  list: baseProcedure.query(async () => {
    return prisma.paiement.findMany({
      include: {
        utilisateur: true,
        reservation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  // Récupérer un paiement par ID
  get: baseProcedure
    .input(paiementIdSchema)
    .query(async ({ input }: { input: PaiementId }) => {
      return prisma.paiement.findUnique({
        where: { id: input.id },
        include: {
          utilisateur: true,
          reservation: true,
        },
      });
    }),

  // Mettre à jour un paiement
  update: baseProcedure
    .input(paiementUpdateSchema)
    .mutation(async ({ input }: { input: PaiementUpdate }) => {
      const { id, ...data } = input;
      return prisma.paiement.update({
        where: { id },
        data,
        include: {
          utilisateur: true,
          reservation: true,
        },
      });
    }),

  // Supprimer un paiement
  delete: baseProcedure
    .input(paiementIdSchema)
    .mutation(async ({ input }: { input: PaiementId }) => {
      return prisma.paiement.delete({
        where: { id: input.id },
      });
    }),
}); 