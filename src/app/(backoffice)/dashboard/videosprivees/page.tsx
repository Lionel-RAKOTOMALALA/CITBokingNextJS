"use client";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import AddVideoPriveeModal from "@/components/videosprivees/AddVideoPriveeModal";
import EditVideoPriveeModal from "@/components/videosprivees/EditVideoPriveeModal";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

export default function VideosPriveesSection() {
  const { data: videos, isLoading, error, refetch } = trpc.videoPrivee.list.useQuery();
  const deleteVideo = trpc.videoPrivee.delete.useMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteError(null);
    try {
      await deleteVideo.mutateAsync({ id: deleteId });
      setDeleteId(null);
      setConfirmOpen(false);
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
          <div className="text-gray-400 text-xs mb-1">Vidéos privées • Listes</div>
          <h1 className="text-xl font-semibold text-white">Liste des vidéos privées</h1>
        </div>
        <AddVideoPriveeModal onVideoAdded={refetch} />
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Titre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Hébergement</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Privée</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Ajoutée le</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Chargement...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="text-center py-8 text-red-500">Erreur lors du chargement</td></tr>
              ) : videos && videos.length > 0 ? (
                videos.map((v: any, index: number) => (
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
                      <span className="text-sm font-medium text-white">{v.titre}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-300">{v.hebergement?.nom || "-"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400">{v.privee ? "Oui" : "Non"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-400">{v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "-"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <EditVideoPriveeModal video={v} onVideoUpdated={refetch} />
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-all duration-150"
                          onClick={() => { setDeleteId(v.id); setConfirmOpen(true); }}
                          title="Supprimer"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Aucune vidéo trouvée</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer avec pagination compacte */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
        <span>
          {videos ? videos.length : 0} vidéo{videos && videos.length > 1 ? "s" : ""} au total
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
        message="Voulez-vous vraiment supprimer cette vidéo ? Cette action est irréversible."
        isLoading={deleteVideo.isPending}
        errorMsg={deleteError}
      />
    </div>
  );
} 