import {createTRPCRouter } from '../init';
import { userRouter } from '@/features/user/server/procedures';
import { homeRouter } from '@/features/home/server/procedures';
import { hotelRouter } from '@/features/hotel/server/procedures';
import { voitureRouter } from '@/features/voiture/server/procedures';
import { hebergementRouter } from '@/features/hebergement/server/procedures';
import { chambreRouter } from '@/features/chambre/server/procedures';
import { typeChambreRouter } from '@/features/typeChambre/server/procedures';
import { paiementRouter } from '@/features/paiement/server/procedures';
import { reservationRouter } from '@/features/reservation/server/procedures';
import { activiteRouter } from '@/features/activite/server/procedures';
import { photoRouter } from '@/features/photo/server/procedures';
import { videoPriveeRouter } from '@/features/videoPrivee/server/procedures';

export const appRouter = createTRPCRouter({
  user: userRouter,
  home: homeRouter,
  hotel: hotelRouter,
  voiture: voitureRouter,
  hebergement: hebergementRouter,
  chambre: chambreRouter,
  typeChambre: typeChambreRouter,
  reservation: reservationRouter,
  paiement: paiementRouter,
  activite: activiteRouter,
  photo: photoRouter,
  videoPrivee: videoPriveeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;