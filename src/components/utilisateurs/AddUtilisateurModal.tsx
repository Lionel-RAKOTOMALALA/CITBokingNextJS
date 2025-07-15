"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddUtilisateurForm from "./AddUtilisateurForm";
import { Utilisateur } from "@/types/schemas";
import { trpc } from "@/trpc/client";
import { FaPlus } from "react-icons/fa";

export default function AddUtilisateurModal({ onUtilisateurAdded }: { onUtilisateurAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const createUtilisateur = trpc.user.create.useMutation();

  const handleSubmit = async (data: Utilisateur) => {
    await createUtilisateur.mutateAsync(data);
    onUtilisateurAdded();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg"
      >
        <FaPlus className="text-xs" />
        Ajouter
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddUtilisateurForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </Modal>
    </>
  );
} 