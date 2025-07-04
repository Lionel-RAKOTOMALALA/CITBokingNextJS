import { z } from 'zod';
import { baseProcedure, protectedProcedure, createTRPCRouter } from '@/trpc/init';
import prisma from '@/db';
import { TRPCError } from '@trpc/server';
import { currentUser } from '@clerk/nextjs/server';

export const userRouter = createTRPCRouter({
  createOrGetUser: baseProcedure
    // .input(
    //   z.object({
    //     text: z.string(),
    //   }),
    // )
    .query(async ({ ctx }) => {
      const { clerkUserId } = ctx;
      if (!clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }


      const user = await prisma.user.findUnique({
        where: {
          clerkUserId,
        },
      });

      const clerkUser = await currentUser();
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
              lastName: clerkUser?.lastName || "RAKOTOMALALA",
              firstName: clerkUser?.firstName || "Lionel",
              email: clerkUser?.emailAddresses[0].emailAddress || "rakotomalalalionel32@gmail.com",
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
            const {user} = ctx;
           
            return user;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "An unexpected error occurred",
            });
        }
    }),
});