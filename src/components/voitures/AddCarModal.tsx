"use client"
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddCarForm from "./AddCarForm";
import { VoitureFormData } from "@/types/voiture";
import { trpc } from "@/trpc/client";

export default function AddCarModal({ onCarAdded }: { onCarAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const createVoiture = trpc.voiture.create.useMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: VoitureFormData) => {
    try {
      await createVoiture.mutateAsync({
        ...data,
        description: data.description ?? ""
      });
      onCarAdded();
      handleClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <>
      <button 
        onClick={handleOpen}
        className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter
      </button>
      <Modal open={open} onClose={handleClose}>
        <AddCarForm onSubmit={handleSubmit} onCancel={handleClose} />
      </Modal>
    </>
  );
} 