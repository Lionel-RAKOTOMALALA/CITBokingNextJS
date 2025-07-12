'use client';

import { useState } from 'react';
import { trpc } from '@/trpc/client';
import { 
  PrismaVoiture, 
  Voiture, 
  VoitureUpdate, 
  VoitureId,
  ProcedureReturn 
} from '@/types/schemas';

// Exemple d'utilisation des types infer dans un composant
export default function TypeInferExample() {
  const [selectedVoiture, setSelectedVoiture] = useState<PrismaVoiture | null>(null);
  const [formData, setFormData] = useState<Voiture>({
    marque: '',
    modele: '',
    prixParJour: 0,
    description: '',
    image: '',
  });

  // Utilisation des types infer pour les requêtes tRPC
  const { data: voitures, isLoading } = trpc.voiture.list.useQuery();
  
  // Type extrait automatiquement de la procédure tRPC
  type VoitureListReturn = ProcedureReturn<typeof trpc.voiture.list.useQuery>;
  
  const createVoitureMutation = trpc.voiture.create.useMutation({
    onSuccess: () => {
      // Recharger la liste après création
      window.location.reload();
    },
  });

  const updateVoitureMutation = trpc.voiture.update.useMutation({
    onSuccess: () => {
      // Recharger la liste après mise à jour
      window.location.reload();
    },
  });

  const deleteVoitureMutation = trpc.voiture.delete.useMutation({
    onSuccess: () => {
      // Recharger la liste après suppression
      window.location.reload();
    },
  });

  const handleCreateVoiture = () => {
    createVoitureMutation.mutate(formData);
  };

  const handleUpdateVoiture = () => {
    if (selectedVoiture) {
      const updateData: VoitureUpdate = {
        id: selectedVoiture.id,
        ...formData,
      };
      updateVoitureMutation.mutate(updateData);
    }
  };

  const handleDeleteVoiture = (voitureId: VoitureId) => {
    deleteVoitureMutation.mutate(voitureId);
  };

  const handleSelectVoiture = (voiture: PrismaVoiture) => {
    setSelectedVoiture(voiture);
    setFormData({
      marque: voiture.marque,
      modele: voiture.modele,
      prixParJour: voiture.prixParJour,
      description: voiture.description,
      image: voiture.image,
    });
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Exemple d'utilisation des types Infer</h2>
      
      {/* Formulaire */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-4">
          {selectedVoiture ? 'Modifier une voiture' : 'Créer une voiture'}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Marque"
            value={formData.marque}
            onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Modèle"
            value={formData.modele}
            onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Prix par jour"
            value={formData.prixParJour}
            onChange={(e) => setFormData({ ...formData, prixParJour: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="url"
            placeholder="URL de l'image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        
        <div className="mt-4 space-x-2">
          <button
            onClick={handleCreateVoiture}
            disabled={createVoitureMutation.isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {createVoitureMutation.isLoading ? 'Création...' : 'Créer'}
          </button>
          
          {selectedVoiture && (
            <button
              onClick={handleUpdateVoiture}
              disabled={updateVoitureMutation.isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {updateVoitureMutation.isLoading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>
          )}
        </div>
      </div>

      {/* Liste des voitures */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Liste des voitures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {voitures?.map((voiture: PrismaVoiture) => (
            <div key={voiture.id} className="border rounded p-4">
              <h4 className="font-semibold">{voiture.marque} {voiture.modele}</h4>
              <p className="text-gray-600">{voiture.description}</p>
              <p className="text-green-600 font-bold">{voiture.prixParJour}€/jour</p>
              <p className={`text-sm ${voiture.disponible ? 'text-green-500' : 'text-red-500'}`}>
                {voiture.disponible ? 'Disponible' : 'Non disponible'}
              </p>
              
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleSelectVoiture(voiture)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteVoiture({ id: voiture.id })}
                  disabled={deleteVoitureMutation.isLoading}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:opacity-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 