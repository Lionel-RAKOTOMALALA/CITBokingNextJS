"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddPhotoForm from "./AddPhotoForm";
import { FaPlus } from "react-icons/fa";
import { trpc } from "@/trpc/client";

export default function AddPhotoModal({ onPhotoAdded }: { onPhotoAdded?: () => void }) {
  const [open, setOpen] = useState(false);
  const createPhoto = trpc.photo.create.useMutation();

  return (
    <>
      <button
        className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg"
        onClick={() => setOpen(true)}
      >
        <FaPlus className="text-xs" />
        Ajouter
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddPhotoForm
          onSubmit={async (data) => {
            await createPhoto.mutateAsync(data);
            setOpen(false);
            onPhotoAdded && onPhotoAdded();
          }}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
} 