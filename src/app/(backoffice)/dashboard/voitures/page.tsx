'use client';

import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import { PrismaVoiture } from "@/types/schemas";
import AddCarModal from "@/components/voitures/AddCarModal";
import EditCarModal from "@/components/voitures/EditCarModal";
import { useState } from "react";
import Modal from "@/components/ui/modal";

// Fonction pour valider une URL d'image
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Fonction pour obtenir une image par défaut valide
const getValidImageUrl = (imageUrl: string): string => {
  if (isValidImageUrl(imageUrl)) {
    return imageUrl;
  }
  // Image par défaut valide
  return "https://via.placeholder.com/48x32/374151/FFFFFF?text=Car";
};

export default function VoituresSection() {
  const { data: voitures, isLoading, refetch } = trpc.voiture.list.useQuery();
  const [editCarId, setEditCarId] = useState<string | null>(null);
  const [deleteCarId, setDeleteCarId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleteVoiture = trpc.voiture.delete.useMutation();

  const handleCarAdded = () => {
    // Rafraîchir la liste des voitures après l'ajout
    refetch();
  };

  const handleDelete = async () => {
    if (!deleteCarId) return;
    setDeleteError(null);
    try {
      await deleteVoiture.mutateAsync({ id: deleteCarId });
      setDeleteCarId(null);
      refetch();
    } catch (e: any) {
      setDeleteError(e?.message || "Erreur lors de la suppression.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">Voitures • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des voitures</h1>
        </div>
        <AddCarModal onCarAdded={handleCarAdded} />
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Recherche..."
            className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-200 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center text-gray-400">Chargement...</div>
          ) : (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-750 border-b border-gray-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Id</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Marque</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Modèle</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Prix/Jour</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Disponible</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {voitures && voitures.length > 0 ? (
                  voitures.map((v: PrismaVoiture, index: number) => (
                <tr
                  key={v.id}
                  className={`hover:bg-gray-750 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-900 text-orange-300 rounded-full text-xs font-medium">
                          {v.id.slice(0, 4)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-12 h-8 rounded overflow-hidden border border-gray-600">
                          <Image
                        src={getValidImageUrl(v.image)}
                        alt={`${v.marque} ${v.modele}`}
                            width={48}
                            height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-white">{v.marque}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-300">{v.modele}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-green-400">{v.prixParJour}</span>
                      <span className="text-xs text-gray-400">€</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {v.disponible ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300 border border-green-800">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        Oui
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-300 border border-red-800">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        Non
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-xs text-gray-400 truncate" title={v.description}>
                      {v.description}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        aria-label="Modifier"
                        className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150"
                        type="button"
                        onClick={() => setEditCarId(v.id)}
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <EditCarModal
                        carId={v.id}
                        open={editCarId === v.id}
                        onOpenChange={(open) => setEditCarId(open ? v.id : null)}
                        onCarUpdated={() => { setEditCarId(null); refetch(); }}
                      />
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150"
                        onClick={() => setDeleteCarId(v.id)}
                        disabled={deleteVoiture.isLoading && deleteCarId === v.id}
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-gray-400">
                      Aucune voiture trouvée.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Footer avec pagination compacte */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {voitures && voitures.length} véhicule{voitures && voitures.length > 1 ? "s" : ""} au total
        </span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">‹</button>
          <button className="px-3 py-1 bg-orange-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">›</button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <Modal open={!!deleteCarId} onClose={() => setDeleteCarId(null)}>
        <div className="p-8 flex flex-col items-center">
          <div className="mb-4 text-2xl text-red-500">
            <FaTrash className="inline mr-2" />
            Confirmer la suppression
          </div>
          <div className="text-slate-300 mb-6 text-center">
            Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est <b>irréversible</b>.
          </div>
          {deleteError && <div className="text-red-400 mb-2">{deleteError}</div>}
          <div className="flex gap-4 mt-2">
            <button
              className="px-4 py-2 rounded bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
              onClick={() => setDeleteCarId(null)}
              disabled={deleteVoiture.isLoading}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
              onClick={handleDelete}
              disabled={deleteVoiture.isLoading}
            >
              {deleteVoiture.isLoading ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
