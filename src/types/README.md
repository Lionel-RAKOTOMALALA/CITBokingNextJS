# Types Infer - Documentation

Ce dossier contient tous les types TypeScript extraits automatiquement de vos schémas Zod avec `z.infer<>`.

## Structure

```
src/types/
├── schemas.ts      # Tous les types infer centralisés
├── index.ts        # Exports centralisés
└── README.md       # Cette documentation
```

## Types disponibles

### Types Zod (pour les entrées de formulaires)
- `Voiture` - Type extrait de `voitureSchema`
- `VoitureUpdate` - Type extrait de `voitureUpdateSchema`
- `VoitureId` - Type extrait de `voitureIdSchema`
- `Hebergement` - Type extrait de `hebergementSchema`
- `Utilisateur` - Type extrait de `utilisateurSchema`
- `User` - Type extrait de `userSchema`
- `Hotel` - Type extrait de `hotelSchema`
- `HotelUpdate` - Type extrait de `hotelUpdateSchema`
- `HotelId` - Type extrait de `hotelIdSchema`
- `Reservation` - Type extrait de `reservationSchema`
- `Chambre` - Type extrait de `chambreSchema`
- `Activite` - Type extrait de `activiteSchema`
- `TypeChambre` - Type extrait de `typeChambreSchema`
- `VideoPrivee` - Type extrait de `videoPriveeSchema`
- `Photo` - Type extrait de `photoSchema`
- `Paiement` - Type extrait de `paiementSchema`

### Types Prisma (pour les retours de base de données)
- `PrismaVoiture` - Type avec tous les champs Prisma (id, createdAt, etc.)
- `PrismaHebergement` - Type avec tous les champs Prisma
- `PrismaUtilisateur` - Type avec tous les champs Prisma
- `PrismaReservation` - Type avec tous les champs Prisma
- `PrismaChambre` - Type avec tous les champs Prisma
- `PrismaActivite` - Type avec tous les champs Prisma
- `PrismaTypeChambre` - Type avec tous les champs Prisma
- `PrismaVideoPrivee` - Type avec tous les champs Prisma
- `PrismaPhoto` - Type avec tous les champs Prisma
- `PrismaPaiement` - Type avec tous les champs Prisma

### Types utilitaires
- `ProcedureReturn<T>` - Extrait le type de retour d'une procédure tRPC
- `ProcedureInput<T>` - Extrait le type d'entrée d'une procédure tRPC
- `WithRelations<T, R>` - Type pour les entités avec relations Prisma

## Utilisation

### Dans les composants React

```typescript
import { PrismaVoiture, Voiture, VoitureUpdate } from '@/types/schemas';

// Pour les données de la base de données
const [voitures, setVoitures] = useState<PrismaVoiture[]>([]);

// Pour les formulaires
const [formData, setFormData] = useState<Voiture>({
  marque: '',
  modele: '',
  prixParJour: 0,
  description: '',
  image: '',
});

// Pour les mises à jour
const updateData: VoitureUpdate = {
  id: 'uuid',
  marque: 'Nouvelle marque',
  // ... autres champs
};
```

### Dans les procédures tRPC

```typescript
import { PrismaVoiture, Voiture, VoitureUpdate } from '@/types/schemas';

export const voitureRouter = createTRPCRouter({
  create: baseProcedure
    .input(voitureSchema)
    .mutation(async ({ input }: { input: Voiture }): Promise<PrismaVoiture> => {
      return prisma.voiture.create({ data: input });
    }),

  list: baseProcedure
    .query(async (): Promise<PrismaVoiture[]> => {
      return prisma.voiture.findMany();
    }),
});
```

### Extraction automatique de types tRPC

```typescript
import { ProcedureReturn } from '@/types/schemas';

// Type extrait automatiquement de la procédure tRPC
type VoitureListReturn = ProcedureReturn<typeof trpc.voiture.list.useQuery>;
```

## Avantages

1. **Cohérence** : Les types sont toujours synchronisés avec les schémas Zod
2. **Maintenance** : Pas besoin de redéfinir manuellement les types
3. **Type Safety** : TypeScript détecte automatiquement les erreurs de type
4. **Productivité** : Moins de code à écrire et maintenir
5. **Réutilisabilité** : Types centralisés et réutilisables partout

## Bonnes pratiques

1. **Utilisez les types Zod** pour les entrées de formulaires et les validations
2. **Utilisez les types Prisma** pour les données retournées par la base de données
3. **Utilisez les types utilitaires** pour extraire des types complexes
4. **Importez depuis `@/types/schemas`** plutôt que de redéfinir les types
5. **Documentez les types complexes** avec des commentaires

## Exemple complet

Voir `src/components/examples/TypeInferExample.tsx` pour un exemple complet d'utilisation. 