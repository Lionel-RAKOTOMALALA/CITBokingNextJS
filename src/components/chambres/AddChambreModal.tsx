"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddChambreForm from "./AddChambreForm";
import { ChambreFormData } from "@/types/chambre";

interface AddChambreModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ChambreFormData) => Promise<void>;
}

export default function AddChambreModal({ open, onClose, onSubmit }: AddChambreModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <AddChambreForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
} 