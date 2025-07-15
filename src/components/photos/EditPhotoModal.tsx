"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddPhotoForm from "./AddPhotoForm";
import { FaEdit } from "react-icons/fa";
import { trpc } from "@/trpc/client";

export default function EditPhotoModal({ photo, onPhotoUpdated }: { photo: any, onPhotoUpdated?: () => void }) {
  const [open, setOpen] = useState(false);
  const updatePhoto = trpc.photo.update.useMutation();

  return (
    <>
      <button
        className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150"
        onClick={() => setOpen(true)}
        title="Modifier"
      >
        <FaEdit className="text-xs" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddPhotoForm
          initialValues={photo}
          submitLabel="Enregistrer"
          onSubmit={async (data) => {
            await updatePhoto.mutateAsync({ ...data, id: photo.id });
            setOpen(false);
            onPhotoUpdated && onPhotoUpdated();
          }}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
} 