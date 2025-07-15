"use client";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddVideoPriveeForm from "./AddVideoPriveeForm";
import { FaEdit } from "react-icons/fa";
import { trpc } from "@/trpc/client";

export default function EditVideoPriveeModal({ video, onVideoUpdated }: { video: any, onVideoUpdated?: () => void }) {
  const [open, setOpen] = useState(false);
  const updateVideo = trpc.videoPrivee.update.useMutation();

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
        <AddVideoPriveeForm
          initialValues={video}
          submitLabel="Enregistrer"
          onSubmit={async (data) => {
            await updateVideo.mutateAsync({ ...data, id: video.id });
            setOpen(false);
            onVideoUpdated && onVideoUpdated();
          }}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
} 