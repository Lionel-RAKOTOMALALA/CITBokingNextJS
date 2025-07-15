"use client";
import { useState } from "react";
import { trpc } from "@/trpc/client";
import { TypeChambreFormData } from "@/types/typeChambre";
import AddTypeChambreModal from "@/components/typechambres/AddTypeChambreModal";
import EditTypeChambreModal from "@/components/typechambres/EditTypeChambreModal";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import Modal from "@/components/ui/modal";

export default function TypeChambresSection() {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.typeChambre.list.useQuery();
  const createMutation = trpc.typeChambre.create.useMutation({
    onSuccess: () => utils.typeChambre.list.invalidate(),
  });
  const updateMutation = trpc.typeChambre.update.useMutation({
    onSuccess: () => utils.typeChambre.list.invalidate(),
  });
  const deleteMutation = trpc.typeChambre.delete.useMutation({
    onSuccess: () => {
      utils.typeChambre.list.invalidate();
      setDeleteId(null);
    },
    onError: (e) => setDeleteError(e.message || "Erreur lors de la suppression."),
  });

  const filtered = data?.filter((t) =>
    t.nom.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-gray-400 text-xs mb-1">Types de chambre • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des types de chambre</h1>
        </div>
        <Button onClick={() => setAddOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg">
          <FaPlus className="text-xs" />
          Ajouter
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Recherche..."
            value={search}
            onChange={e => setSearch(e.target.value)}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nom</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Capacité max</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {isLoading ? (
                <tr><td colSpan={4} className="text-center py-8"><Loading /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Aucun type de chambre trouvé.</td></tr>
              ) : filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-750 transition-colors duration-150">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-white">{t.nom}</span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="text-xs text-gray-400 truncate" title={t.description}>{t.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-orange-400">{t.capaciteMax}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150"
                        onClick={() => { setSelected(t); setEditOpen(true); }}
                        aria-label="Éditer"
                      >
                        <FaEdit className="text-xs" />
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150"
                        onClick={() => setDeleteId(t.id)}
                        aria-label="Supprimer"
                        disabled={deleteMutation.isLoading}
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

      {/* Footer avec pagination compacte (à implémenter si besoin) */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {filtered.length} type{filtered.length > 1 ? "s" : ""} de chambre au total
        </span>
        {/* Pagination à ajouter si besoin */}
      </div>

      {/* Modals */}
      <AddTypeChambreModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={async (data) => {
          await createMutation.mutateAsync(data);
          setAddOpen(false);
        }}
      />
      {selected && (
        <EditTypeChambreModal
          open={editOpen}
          onClose={() => { setEditOpen(false); setSelected(null); }}
          initialValues={selected}
          onSubmit={async (data) => {
            await updateMutation.mutateAsync({ ...data, id: selected.id });
            setEditOpen(false);
            setSelected(null);
          }}
        />
      )}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)}>
        <div className="p-8 flex flex-col items-center">
          <div className="mb-4 text-2xl text-red-500">
            <FaTrash className="inline mr-2" />
            Confirmer la suppression
          </div>
          <div className="text-slate-300 mb-6 text-center">
            Êtes-vous sûr de vouloir supprimer ce type de chambre ? Cette action est <b>irréversible</b>.
          </div>
          {deleteError && <div className="text-red-400 mb-2">{deleteError}</div>}
          <div className="flex gap-4 mt-2">
            <button
              className="px-4 py-2 rounded bg-slate-700 text-slate-200 hover:bg-slate-600 transition"
              onClick={() => setDeleteId(null)}
              disabled={deleteMutation.status === 'loading'}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold"
              onClick={async () => {
                setDeleteError(null);
                try {
                  await deleteMutation.mutateAsync({ id: deleteId! });
                  setDeleteId(null);
                } catch (e: any) {
                  setDeleteError(e?.message || 'Erreur lors de la suppression.');
                }
              }}
              disabled={deleteMutation.status === 'loading'}
            >
              {deleteMutation.status === 'loading' ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 