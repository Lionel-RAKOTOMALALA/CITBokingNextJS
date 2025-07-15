"use client";
import Modal from "@/components/ui/modal";
import AddPaiementForm from "./AddPaiementForm";
import { Paiement } from "@/types/schemas";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";

export default function EditPaiementModal({ paiementId, open, onOpenChange, onPaiementUpdated }: { paiementId: string, open: boolean, onOpenChange: (open: boolean) => void, onPaiementUpdated: () => void }) {
  const paiementQuery = trpc.paiement.get.useQuery({ id: paiementId }, { enabled: open });
  const updatePaiement = trpc.paiement.update.useMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: Paiement) => {
    setErrorMsg(null);
    try {
      await updatePaiement.mutateAsync({ ...data, id: paiementId });
      onPaiementUpdated();
      onOpenChange(false);
    } catch (err: any) {
      setErrorMsg(err?.message || "Erreur lors de la mise à jour");
    }
  };

  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      {paiementQuery.isLoading ? (
        <div className="p-6 text-center"><Loading size="md" /> Chargement...</div>
      ) : paiementQuery.data ? (
        <AddPaiementForm
          initialValues={paiementQuery.data}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={updatePaiement.isPending ? <><Loading size="sm" /> Enregistrement...</> : "Enregistrer"}
          isSubmitting={updatePaiement.isPending}
          errorMsg={errorMsg}
        />
      ) : (
        <div className="p-6 text-center text-red-400">Erreur de chargement</div>
      )}
    </Modal>
  );
} 