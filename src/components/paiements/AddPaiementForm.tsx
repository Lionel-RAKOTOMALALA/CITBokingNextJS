"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paiementSchema, statutPaiementEnum, moyenPaiementEnum } from "@/schemas/paiement";
import { Paiement } from "@/types/schemas";
import { trpc } from "@/trpc/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";

interface AddPaiementFormProps {
  onSubmit: (data: Paiement) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<Paiement>;
  submitLabel?: React.ReactNode;
  isSubmitting?: boolean;
  errorMsg?: string | null;
}

export default function AddPaiementForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter", isSubmitting = false, errorMsg }: AddPaiementFormProps) {
  const { data: utilisateurs = [] } = trpc.user.list.useQuery();
  const { data: reservations = [] } = trpc.reservation.list.useQuery();

  const { register, handleSubmit, watch, formState: { errors, isValid, touchedFields }, reset } = useForm<Paiement>({
    resolver: zodResolver(paiementSchema),
    defaultValues: initialValues || {
      montant: 0,
      statut: "EN_ATTENTE",
      moyenPaiement: "VISA",
      utilisateurId: "",
      reservationId: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  const progressionFields: (keyof Paiement)[] = ["montant", "statut", "moyenPaiement", "utilisateurId", "reservationId"];
  const filledCount = progressionFields.reduce((acc, key) => {
    if (
      (typeof watchedFields[key] === "string" && watchedFields[key].trim() !== "" && !errors[key]) ||
      (typeof watchedFields[key] === "number" && watchedFields[key] > 0 && !errors[key])
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const totalRequired = progressionFields.length;

  const handleFormSubmit = async (data: Paiement) => {
    await onSubmit(data);
    reset();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-white mb-4">Ajouter un paiement</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Montant */}
        <div>
          <label className="block text-gray-300 mb-1">Montant *</label>
          <input
            type="number"
            step="0.01"
            {...register("montant", { valueAsNumber: true })}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.montant && <p className="text-red-500 text-xs mt-1">{errors.montant.message}</p>}
        </div>
        {/* Statut */}
        <div>
          <label className="block text-gray-300 mb-1">Statut *</label>
          <select
            {...register("statut")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          >
            {statutPaiementEnum.options.map((statut) => (
              <option key={statut} value={statut}>{statut}</option>
            ))}
          </select>
          {errors.statut && <p className="text-red-500 text-xs mt-1">{errors.statut.message}</p>}
        </div>
        {/* Moyen de paiement */}
        <div>
          <label className="block text-gray-300 mb-1">Moyen de paiement *</label>
          <select
            {...register("moyenPaiement")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          >
            {moyenPaiementEnum.options.map((moyen) => (
              <option key={moyen} value={moyen}>{moyen}</option>
            ))}
          </select>
          {errors.moyenPaiement && <p className="text-red-500 text-xs mt-1">{errors.moyenPaiement.message}</p>}
        </div>
        {/* Utilisateur */}
        <div>
          <label className="block text-gray-300 mb-1">Utilisateur *</label>
          <select
            {...register("utilisateurId")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          >
            <option value="">Sélectionner un utilisateur</option>
            {utilisateurs.map((u: any) => (
              <option key={u.id} value={u.id}>{u.nom} ({u.email})</option>
            ))}
          </select>
          {errors.utilisateurId && <p className="text-red-500 text-xs mt-1">{errors.utilisateurId.message}</p>}
        </div>
        {/* Réservation */}
        <div>
          <label className="block text-gray-300 mb-1">Réservation *</label>
          <select
            {...register("reservationId")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          >
            <option value="">Sélectionner une réservation</option>
            {reservations.map((r: any) => (
              <option key={r.id} value={r.id}>{r.id}</option>
            ))}
          </select>
          {errors.reservationId && <p className="text-red-500 text-xs mt-1">{errors.reservationId.message}</p>}
        </div>
        {/* Progression */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-3 border border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-300 font-medium text-sm">Progression</span>
            <span className="text-xs text-white">{filledCount}/{totalRequired} champs requis et valides</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(filledCount / totalRequired) * 100}%` }}
            />
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-3 pt-3 border-t border-slate-700">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 bg-transparent text-sm h-10"
          >
            Annuler
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting} className="flex-1 text-sm h-10">
            {submitLabel}
          </Button>
        </div>
        {errorMsg && <div className="text-red-400 text-xs mt-2 text-center">{errorMsg}</div>}
      </form>
    </div>
  );
} 