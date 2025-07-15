"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddTypeChambreForm from "./AddTypeChambreForm";
import { TypeChambreFormData } from "@/types/typeChambre";

interface EditTypeChambreModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: TypeChambreFormData;
  onSubmit: (data: TypeChambreFormData) => Promise<void>;
}

export default function EditTypeChambreModal({ open, onClose, initialValues, onSubmit }: EditTypeChambreModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddTypeChambreForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onClose} submitLabel="Enregistrer" />
    </Modal>
  );
} 