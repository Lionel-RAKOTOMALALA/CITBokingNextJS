"use client";
import Modal from "@/components/ui/modal";
import AddReservationForm from "./AddReservationForm";
import { ReservationFormData } from "@/types/reservation";

interface AddReservationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReservationFormData) => Promise<void>;
}

export default function AddReservationModal({ open, onClose, onSubmit }: AddReservationModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddReservationForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
} 