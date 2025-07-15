'use client';
import { trpc } from "@/trpc/client";
import AddHebergementModal from "@/components/hebergements/AddHebergementModal";
import EditHebergementModal from "@/components/hebergements/EditHebergementModal";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { PrismaHebergement } from "@/types/schemas";

export default function HebergementsSection() {
  const { data: hebergements, isLoading, refetch } = trpc.hebergement.list.useQuery();
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleteHebergement = trpc.hebergement.delete.useMutation();

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteError(null);
    try {
      await deleteHebergement.mutateAsync({ id: deleteId });
      setDeleteId(null);
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
          <div className="text-gray-400 text-xs mb-1">Hébergements • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des hébergements</h1>
        </div>
        <AddHebergementModal onHebergementAdded={refetch} />
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Localisation</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {hebergements && hebergements.length > 0 ? (
                (hebergements as PrismaHebergement[]).map((h: PrismaHebergement, index: number) => (
                  <tr
                    key={h.id}
                    className={`hover:bg-gray-750 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-825"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-900 text-orange-300 rounded-full text-xs font-medium">
                        {h.id.slice(0, 4)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-white">{h.nom}</span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-xs text-gray-400 truncate" title={h.description}>
                        {h.description}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300">{h.localisation}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          aria-label="Modifier"
                          className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150"
                          type="button"
                          onClick={() => setEditId(h.id)}
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <EditHebergementModal
                          hebergementId={h.id}
                          open={editId === h.id}
                          onOpenChange={open => setEditId(open ? h.id : null)}
                          onHebergementUpdated={refetch}
                        />
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150"
                          onClick={() => setDeleteId(h.id)}
                          disabled={deleteHebergement.status === 'loading' && deleteId === h.id}
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    Aucun hébergement trouvé.
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
          {hebergements && hebergements.length} hébergement{hebergements && hebergements.length > 1 ? "s" : ""} au total
        </span>
        <div className="flex gap-1">
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">‹</button>
          <button className="px-3 py-1 bg-orange-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">›</button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div className="p-8 flex flex-col items-center">
          <div className="mb-4 text-2xl text-red-500">
            <FaTrash className="inline mr-2" />
            Confirmer la suppression
          </div>
          <div className="text-slate-300 mb-6 text-center">
            Êtes-vous sûr de vouloir supprimer cet hébergement ? Cette action est <b>irréversible</b>.
          </div>
          {deleteError && <div className="text-red-400 mb-2">{deleteError}</div>}
          <div className="flex gap-4 mt-2">
            <button
              className="px-4 py-2 rounded bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
              onClick={() => setDeleteId(null)}
              disabled={deleteHebergement.status === 'loading'}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
              onClick={handleDelete}
              disabled={deleteHebergement.status === 'loading'}
            >
              {deleteHebergement.status === 'loading' ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 