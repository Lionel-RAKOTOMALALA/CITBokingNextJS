"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddHebergementForm from "./AddHebergementForm";
import { HebergementFormData } from "@/types/hebergement";
import { trpc } from "@/trpc/client";
import { FaPlus } from "react-icons/fa";

export default function AddHebergementModal({ onHebergementAdded }: { onHebergementAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const createHebergement = trpc.hebergement.create.useMutation();

  const handleSubmit = async (data: HebergementFormData) => {
    await createHebergement.mutateAsync(data);
    onHebergementAdded();
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
        <AddHebergementForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </Modal>
    </>
  );
} 