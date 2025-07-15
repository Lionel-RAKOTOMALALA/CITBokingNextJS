import { useState } from "react";
import Modal from "@/components/ui/modal";
import AddActiviteForm from "./AddActiviteForm";
import { Activite } from "@/types/schemas";
import { trpc } from "@/trpc/client";

export default function EditActiviteModal({ activite, onActiviteUpdated }: { activite: Activite; onActiviteUpdated: () => void }) {
  const [open, setOpen] = useState(false);
  const updateActivite = trpc.activite.update.useMutation();

  const handleSubmit = async (data: Activite) => {
    await updateActivite.mutateAsync({ ...data, id: activite.id });
    onActiviteUpdated();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-all duration-150"
        title="Modifier"
      >
        <span className="sr-only">Modifier</span>
        <svg className="text-xs" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10A.5.5 0 0 1 4.5 14H2a.5.5 0 0 1-.5-.5v-2.5a.5.5 0 0 1 .146-.354l10-10zM11.207 2.5 13.5 4.793 12.207 6.086 9.914 3.793 11.207 2.5zm1.586 3.207-1.293-1.293-8.5 8.5V13h1.586l8.5-8.5z"/></svg>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddActiviteForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          initialValues={activite}
          submitLabel="Enregistrer"
          isSubmitting={updateActivite.isPending}
          errorMsg={updateActivite.error?.message}
        />
      </Modal>
    </>
  );
} 