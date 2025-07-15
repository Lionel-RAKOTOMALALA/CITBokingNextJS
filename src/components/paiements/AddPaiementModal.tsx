"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddPaiementForm from "./AddPaiementForm";
import { Paiement } from "@/types/schemas";
import { trpc } from "@/trpc/client";
import { FaPlus } from "react-icons/fa";

export default function AddPaiementModal({ onPaiementAdded }: { onPaiementAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const createPaiement = trpc.paiement.create.useMutation();

  const handleSubmit = async (data: Paiement) => {
    await createPaiement.mutateAsync(data);
    onPaiementAdded();
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
        <AddPaiementForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isSubmitting={createPaiement.isPending} errorMsg={createPaiement.error?.message} />
      </Modal>
    </>
  );
} 