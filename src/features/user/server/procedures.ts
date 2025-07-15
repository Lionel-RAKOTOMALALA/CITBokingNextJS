import { baseProcedure, protectedProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { TRPCError } from '@trpc/server';
import { currentUser } from '@clerk/nextjs/server';
import { utilisateurSchema, utilisateurIdSchema } from '@/schemas/utilisateur';
import { PrismaUtilisateur } from '@/types/schemas';

export const userRouter = createTRPCRouter({
  // CRUD complet pour le backoffice
  create: baseProcedure
    .input(utilisateurSchema)
    .mutation(async ({ input }) => {
      return prisma.utilisateur.create({
        data: input,
        select: {
          id: true,
          nom: true,
          email: true,
          motDePasse: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          clerkUserId: true,
        },
      });
    }),

  list: baseProcedure.query(async () => {
    return prisma.utilisateur.findMany({
      select: {
        id: true,
        nom: true,
        email: true,
        motDePasse: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        clerkUserId: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  get: baseProcedure.input(utilisateurIdSchema).query(async ({ input }) => {
    return prisma.utilisateur.findUnique({
      where: { id: input.id },
      select: {
        id: true,
        nom: true,
        email: true,
        motDePasse: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        clerkUserId: true,
      },
    });
  }),

  update: baseProcedure
    .input(utilisateurSchema.extend({ id: utilisateurSchema.shape.clerkUserId }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.utilisateur.update({
        where: { id },
        data,
        select: {
          id: true,
          nom: true,
          email: true,
          motDePasse: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          clerkUserId: true,
        },
      });
    }),

  delete: baseProcedure
    .input(utilisateurIdSchema)
    .mutation(async ({ input }) => {
      return prisma.utilisateur.delete({
        where: { id: input.id },
        select: {
          id: true,
          nom: true,
          email: true,
          motDePasse: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          clerkUserId: true,
        },
      });
    }),

  // Les méthodes custom existantes sont conservées
  createOrGetUser: baseProcedure
    .query(async ({ ctx }) => {
      const { clerkUserId } = ctx;
      if (!clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const user = await prisma.utilisateur.findUnique({
        where: {
          clerkUserId,
        },
      });

      const clerkUser = await currentUser();
      if (!user) {
        const newUser = await prisma.utilisateur.create({
          data: {
            nom: ((clerkUser?.lastName || "RAKOTOMALALA") + " " + (clerkUser?.firstName || "Lionel")).trim(),
            email: clerkUser?.emailAddresses[0].emailAddress || "rakotomalalalionel32@gmail.com",
            motDePasse: "changeme",
            clerkUserId,
          },
        });

        return newUser;
      }

      return user;
    }),
  getUser: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const { user } = ctx;
        return user;
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
});