"use client";
import Modal from "@/components/ui/modal";
import AddReservationForm from "./AddReservationForm";
import { ReservationFormData } from "@/types/reservation";

interface EditReservationModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: ReservationFormData;
  onSubmit: (data: ReservationFormData) => Promise<void>;
}

export default function EditReservationModal({ open, onClose, initialValues, onSubmit }: EditReservationModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddReservationForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onClose} submitLabel="Enregistrer" />
    </Modal>
  );
} 