"use client"
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddCarForm from "./AddCarForm";
import { VoitureFormData } from "@/types/voiture";
import { trpc } from "@/trpc/client";
import { PrismaVoiture } from "@/types/schemas";
import { FaEdit } from "react-icons/fa";

interface EditCarModalProps {
  carId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCarUpdated: () => void;
}

export default function EditCarModal({ carId, open, onOpenChange, onCarUpdated }: EditCarModalProps) {
  const voitureQuery = trpc.voiture.get.useQuery({ id: carId }, { enabled: open });
  const updateVoiture = trpc.voiture.update.useMutation();

  const handleClose = () => onOpenChange(false);

  const handleSubmit = async (data: VoitureFormData) => {
    try {
      await updateVoiture.mutateAsync({
        ...data,
        id: carId,
        description: data.description ?? ""
      });
      onCarUpdated();
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {voitureQuery.isLoading ? (
        <div className="p-8 text-center text-slate-400">Chargement...</div>
      ) : voitureQuery.data ? (
        <AddCarForm
          initialValues={voitureQuery.data as PrismaVoiture}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          submitLabel="Enregistrer"
        />
      ) : (
        <div className="p-8 text-center text-red-400">Erreur de chargement</div>
      )}
    </Modal>
  );
} 