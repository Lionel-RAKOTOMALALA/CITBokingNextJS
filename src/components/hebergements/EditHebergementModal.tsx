"use client";
import Modal from "@/components/ui/modal";
import AddHebergementForm from "./AddHebergementForm";
import { HebergementFormData } from "@/types/hebergement";
import { trpc } from "@/trpc/client";

export default function EditHebergementModal({ hebergementId, open, onOpenChange, onHebergementUpdated }: { hebergementId: string, open: boolean, onOpenChange: (open: boolean) => void, onHebergementUpdated: () => void }) {
  const hebergementQuery = trpc.hebergement.get.useQuery({ id: hebergementId }, { enabled: open });
  const updateHebergement = trpc.hebergement.update.useMutation();

  const handleSubmit = async (data: HebergementFormData) => {
    await updateHebergement.mutateAsync({ ...data, id: hebergementId });
    onHebergementUpdated();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      {hebergementQuery.isLoading ? (
        <div>Chargement...</div>
      ) : hebergementQuery.data ? (
        <AddHebergementForm
          initialValues={hebergementQuery.data}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel="Enregistrer"
        />
      ) : (
        <div>Erreur de chargement</div>
      )}
    </Modal>
  );
} 