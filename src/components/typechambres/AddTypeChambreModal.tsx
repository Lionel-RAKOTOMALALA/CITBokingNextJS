"use client";
import Modal from "@/components/ui/modal";
import AddTypeChambreForm from "./AddTypeChambreForm";
import { TypeChambreFormData } from "@/types/typeChambre";

interface AddTypeChambreModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TypeChambreFormData) => Promise<void>;
}

export default function AddTypeChambreModal({ open, onClose, onSubmit }: AddTypeChambreModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddTypeChambreForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
} 