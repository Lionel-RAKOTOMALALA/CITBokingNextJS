"use client";
import Modal from "./modal";
import { ReactNode } from "react";
import { Loading } from "@/components/ui/loading";

interface ConfirmDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => Promise<void>;
  title?: string;
  message?: ReactNode;
  isLoading?: boolean;
  errorMsg?: string | null;
}

export default function ConfirmDeleteModal({ open, onOpenChange, onDelete, title = "Confirmer la suppression", message = "Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.", isLoading = false, errorMsg }: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">{title}</h2>
        <div className="text-slate-400 mb-4">{message}</div>
        {errorMsg && <div className="text-red-400 text-xs mb-2">{errorMsg}</div>}
        <div className="flex gap-3 justify-center mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold flex items-center gap-2"
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading && <Loading size="sm" />}
            Supprimer
          </button>
        </div>
      </div>
    </Modal>
  );
} 