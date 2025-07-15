"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddActiviteForm from "./AddActiviteForm";
import { Activite } from "@/types/schemas";
import { trpc } from "@/trpc/client";
import { FaPlus } from "react-icons/fa";

export default function AddActiviteModal({ onActiviteAdded }: { onActiviteAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const createActivite = trpc.activite.create.useMutation();

  const handleSubmit = async (data: Activite) => {
    await createActivite.mutateAsync(data);
    onActiviteAdded();
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
        <AddActiviteForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} isSubmitting={createActivite.isPending} errorMsg={createActivite.error?.message} />
      </Modal>
    </>
  );
} 