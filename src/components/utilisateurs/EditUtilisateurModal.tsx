"use client";
import Modal from "@/components/ui/modal";
import AddUtilisateurForm from "./AddUtilisateurForm";
import { Utilisateur } from "@/types/schemas";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import { Loading } from "@/components/ui/loading";

export default function EditUtilisateurModal({ utilisateurId, open, onOpenChange, onUtilisateurUpdated }: { utilisateurId: string, open: boolean, onOpenChange: (open: boolean) => void, onUtilisateurUpdated: () => void }) {
  const utilisateurQuery = trpc.user.get.useQuery({ id: utilisateurId }, { enabled: open });
  const updateUtilisateur = trpc.user.update.useMutation();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: Utilisateur) => {
    setErrorMsg(null);
    setSuccess(false);
    try {
      await updateUtilisateur.mutateAsync({ ...data, id: utilisateurId });
      setSuccess(true);
      onUtilisateurUpdated();
      onOpenChange(false);
    } catch (err: any) {
      setErrorMsg(err?.message || "Erreur lors de la mise à jour");
    }
  };

  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      {utilisateurQuery.isLoading ? (
        <div className="p-6 text-center"><Loading size="md" /> Chargement...</div>
      ) : utilisateurQuery.data ? (
        <AddUtilisateurForm
          initialValues={utilisateurQuery.data}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={updateUtilisateur.isPending ? <><Loading size="sm" /> Enregistrement...</> : "Enregistrer"}
          isSubmitting={updateUtilisateur.isPending}
          errorMsg={errorMsg}
        />
      ) : (
        <div className="p-6 text-center text-red-400">Erreur de chargement</div>
      )}
    </Modal>
  );
} 