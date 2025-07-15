"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { trpc } from "@/trpc/client";
import AddPaiementModal from "@/components/paiements/AddPaiementModal";
import EditPaiementModal from "@/components/paiements/EditPaiementModal";
import DeletePaiementModal from "@/components/paiements/DeletePaiementModal";
import { Loading } from "@/components/ui/loading";

export default function PaiementsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPaiementId, setEditingPaiementId] = useState<string | null>(null);
  const [deletingPaiementId, setDeletingPaiementId] = useState<string | null>(null);
  const utils = trpc.useUtils();

  // Récupération des paiements
  const { data: paiements = [], isLoading, error } = trpc.paiement.list.useQuery();

  // Filtrage côté client
  const filteredPaiements = paiements.filter((p) => {
    const utilisateur = p.utilisateur?.nom || "";
    const statut = p.statut || "";
    const moyen = p.moyenPaiement || "";
    return (
      utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statut.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moyen.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Callback pour rafraîchir la liste après ajout
  const handlePaiementAdded = () => {
    utils.paiement.list.invalidate();
  };

  const handlePaiementUpdated = () => {
    utils.paiement.list.invalidate();
  };
  const handlePaiementDeleted = () => {
    utils.paiement.list.invalidate();
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen">
        <div className="text-red-400 text-center">
          Erreur lors du chargement des paiements: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">Paiements • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des paiements</h1>
        </div>
        <AddPaiementModal onPaiementAdded={handlePaiementAdded} />
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-gray-200 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-750 border-b border-gray-600">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Id</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Utilisateur</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Moyen</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPaiements.map((p, index) => (
                <tr
                  key={p.id}
                  className={`hover:bg-gray-750 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-900 text-orange-300 rounded-full text-xs font-medium">
                      {p.id.slice(0, 2)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-white">{p.utilisateur?.nom || "-"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-green-400">{p.montant} €</span>
                  </td>
                  <td className="px-4 py-3">
                    {p.statut === "PAYE" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300 border border-green-800">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        Payé
                      </span>
                    ) : p.statut === "EN_ATTENTE" ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300 border border-yellow-800">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        En attente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-300 border border-red-800">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        Annulé
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-300">{p.moyenPaiement}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150"
                        onClick={() => setEditingPaiementId(p.id)}
                        title="Éditer"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150"
                        onClick={() => setDeletingPaiementId(p.id)}
                        title="Supprimer"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer avec pagination compacte */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {filteredPaiements.length} paiement{filteredPaiements.length > 1 ? "s" : ""} au total
        </span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">‹</button>
          <button className="px-3 py-1 bg-orange-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">›</button>
        </div>
      </div>

      {/* Modal d'édition */}
      {editingPaiementId && (
        <EditPaiementModal
          paiementId={editingPaiementId}
          open={!!editingPaiementId}
          onOpenChange={(open) => !open && setEditingPaiementId(null)}
          onPaiementUpdated={handlePaiementUpdated}
        />
      )}
      {/* Modal de suppression */}
      {deletingPaiementId && (
        <DeletePaiementModal
          paiementId={deletingPaiementId}
          open={!!deletingPaiementId}
          onOpenChange={(open) => !open && setDeletingPaiementId(null)}
          onPaiementDeleted={handlePaiementDeleted}
        />
      )}
    </div>
  );
} 