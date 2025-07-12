const { appRouter } = require('./src/trpc/routers/_app.ts');

console.log('App Router:', appRouter);
console.log('Voiture router:', appRouter.voiture);
console.log('Available routers:', Object.keys(appRouter)); 