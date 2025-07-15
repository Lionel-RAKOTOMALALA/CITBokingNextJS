"use client";
import Modal from "@/components/ui/modal";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";
import { FaTrash } from "react-icons/fa";

export default function DeleteUtilisateurModal({ utilisateurId, open, onOpenChange, onUtilisateurDeleted }: { utilisateurId: string, open: boolean, onOpenChange: (open: boolean) => void, onUtilisateurDeleted: () => void }) {
  const deleteUtilisateur = trpc.user.delete.useMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async () => {
    setErrorMsg(null);
    try {
      await deleteUtilisateur.mutateAsync({ id: utilisateurId });
      onUtilisateurDeleted();
      onOpenChange(false);
    } catch (err: any) {
      setErrorMsg(err?.message || "Erreur lors de la suppression");
    }
  };

  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <FaTrash className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-lg font-bold text-white mb-2">Supprimer cet utilisateur ?</h2>
        <p className="text-slate-400 mb-4">Cette action est <span className="text-red-400 font-semibold">irréversible</span>.<br />Voulez-vous vraiment supprimer cet utilisateur ?</p>
        {errorMsg && <div className="text-red-400 text-xs mb-2">{errorMsg}</div>}
        <div className="flex gap-3 justify-center mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
            onClick={() => onOpenChange(false)}
            disabled={deleteUtilisateur.isPending}
          >
            Annuler
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold flex items-center gap-2"
            onClick={handleDelete}
            disabled={deleteUtilisateur.isPending}
          >
            {deleteUtilisateur.isPending && <Loading size="sm" />}
            Supprimer
          </button>
        </div>
      </div>
    </Modal>
  );
} 