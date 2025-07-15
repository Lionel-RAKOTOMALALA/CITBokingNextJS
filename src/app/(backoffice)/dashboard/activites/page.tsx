"use client";

import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import AddActiviteModal from "@/components/activites/AddActiviteModal";
import EditActiviteModal from "@/components/activites/EditActiviteModal";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import { trpc } from "@/trpc/client";
import { useState } from "react";

export default function ActivitesSection() {
  const { data: activites, isLoading, error } = trpc.activite.list.useQuery();
  const utils = trpc.useUtils();
  const deleteActivite = trpc.activite.delete.useMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteActivite.mutateAsync({ id: deleteId });
      utils.activite.list.invalidate();
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">Activités • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des activités</h1>
        </div>
        <AddActiviteModal onActiviteAdded={() => utils.activite.list.invalidate()} />
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
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-750 border-b border-gray-600">
                {/* <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Id</th> */}
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Localisation</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Prix / Pers.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Image</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Chargement...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="text-center py-8 text-red-500">Erreur lors du chargement</td></tr>
              ) : activites && activites.length > 0 ? (
                activites.map((a: any, index: number) => (
                  <tr
                    key={a.id}
                    className={`hover:bg-gray-750 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                    }`}
                  >
                    {/* <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-900 text-orange-300 rounded-full text-xs font-medium">
                        {a.id}
                      </span>
                    </td> */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-white">{a.nom}</span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-xs text-gray-400 truncate" title={a.description}>
                        {a.description}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300">{a.localisation}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300">{a.prixParPersonne} €</span>
                    </td>
                    <td className="px-4 py-3">
                      {a.image && (
                        <img src={a.image} alt={a.nom} className="w-12 h-12 object-cover rounded" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <EditActiviteModal activite={a} onActiviteUpdated={() => utils.activite.list.invalidate()} />
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150"
                          onClick={() => { setDeleteId(a.id); setConfirmOpen(true); }}
                          title="Supprimer"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Aucune activité trouvée</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer avec pagination compacte */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {activites ? activites.length : 0} activité{activites && activites.length > 1 ? "s" : ""} au total
        </span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">‹</button>
          <button className="px-3 py-1 bg-orange-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">›</button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <ConfirmDeleteModal
        open={confirmOpen}
        onOpenChange={(open) => { setConfirmOpen(open); if (!open) setDeleteId(null); }}
        onDelete={handleDelete}
        title="Confirmer la suppression"
        message="Voulez-vous vraiment supprimer cette activité ? Cette action est irréversible."
        isLoading={deleteActivite.isPending}
        errorMsg={deleteActivite.error?.message}
      />
    </div>
  );
} 