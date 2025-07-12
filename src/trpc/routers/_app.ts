import {createTRPCRouter } from '../init';
import { userRouter } from '@/features/user/server/procedures';
import { homeRouter } from '@/features/home/server/procedures';
import { hotelRouter } from '@/features/hotel/server/procedures';
import { voitureRouter } from '@/features/voiture/server/procedures';

export const appRouter = createTRPCRouter({
  user: userRouter,
  home: homeRouter,
  hotel: hotelRouter,
  voiture: voitureRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;