"use client";
import Modal from "@/components/ui/modal";
import AddChambreForm from "./AddChambreForm";
import { ChambreFormData } from "@/types/chambre";

interface EditChambreModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: ChambreFormData;
  onSubmit: (data: ChambreFormData) => Promise<void>;
}

export default function EditChambreModal({ open, onClose, initialValues, onSubmit }: EditChambreModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddChambreForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onClose} submitLabel="Enregistrer" />
    </Modal>
  );
} 