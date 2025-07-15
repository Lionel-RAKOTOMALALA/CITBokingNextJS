"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema } from "@/schemas/reservation";
import { ReservationFormData } from "@/types/reservation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Check, X, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";
import { trpc } from "@/trpc/client";

interface AddReservationFormProps {
  onSubmit: (data: ReservationFormData) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<ReservationFormData>;
  submitLabel?: string;
}

type ReservationFieldKey = keyof ReservationFormData;

function toDateInputValue(date: Date | string | undefined) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

export default function AddReservationForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isValid, touchedFields }, reset, setValue } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      ...initialValues,
      dateDebut: toDateInputValue(initialValues?.dateDebut),
      dateFin: toDateInputValue(initialValues?.dateFin),
      nombrePersonnes: initialValues?.nombrePersonnes || 1,
      utilisateurId: initialValues?.utilisateurId || "",
      chambreId: initialValues?.chambreId || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  const progressionFields: ReservationFieldKey[] = ["dateDebut", "dateFin", "nombrePersonnes", "utilisateurId", "chambreId"];
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

  // Fetch utilisateurs et chambres pour les dropdowns
  const { data: utilisateurs, isLoading: loadingUtilisateurs } = trpc.user.list.useQuery();
  const { data: chambres, isLoading: loadingChambres } = trpc.chambre.list.useQuery();

  const handleFormSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Ajouter une réservation</h2>
          <p className="text-slate-400 text-sm leading-tight">Ajoutez une nouvelle réservation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Date début */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Date de début *
            {touchedFields.dateDebut && !errors.dateDebut && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              type="date"
              {...register("dateDebut")}
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.dateDebut ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.dateDebut && !errors.dateDebut ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.dateDebut && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.dateDebut && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.dateDebut.message}
            </p>
          )}
        </div>

        {/* Date fin */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Date de fin *
            {touchedFields.dateFin && !errors.dateFin && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              type="date"
              {...register("dateFin")}
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.dateFin ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.dateFin && !errors.dateFin ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.dateFin && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.dateFin && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.dateFin.message}
            </p>
          )}
        </div>

        {/* Nombre de personnes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Nombre de personnes *
            {touchedFields.nombrePersonnes && !errors.nombrePersonnes && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              {...register("nombrePersonnes", { valueAsNumber: true })}
              placeholder="Nombre de personnes"
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.nombrePersonnes ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.nombrePersonnes && !errors.nombrePersonnes ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.nombrePersonnes && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.nombrePersonnes && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.nombrePersonnes.message}
            </p>
          )}
        </div>

        {/* Utilisateur */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Utilisateur *
            {touchedFields.utilisateurId && !errors.utilisateurId && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <select
              {...register("utilisateurId")}
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.utilisateurId ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.utilisateurId && !errors.utilisateurId ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
              disabled={loadingUtilisateurs}
              defaultValue={initialValues?.utilisateurId || ""}
            >
              <option value="" disabled>Choisir un utilisateur</option>
              {utilisateurs?.map((u: any) => (
                <option key={u.id} value={u.id}>{u.nom} ({u.email})</option>
              ))}
            </select>
            {errors.utilisateurId && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.utilisateurId && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.utilisateurId.message}
            </p>
          )}
        </div>

        {/* Chambre */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Chambre *
            {touchedFields.chambreId && !errors.chambreId && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <select
              {...register("chambreId")}
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.chambreId ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.chambreId && !errors.chambreId ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
              disabled={loadingChambres}
              defaultValue={initialValues?.chambreId || ""}
            >
              <option value="" disabled>Choisir une chambre</option>
              {chambres?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.numero} — {c.hebergement?.nom || "?"} / {c.typeChambre?.nom || "?"}
                </option>
              ))}
            </select>
            {errors.chambreId && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.chambreId && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.chambreId.message}
            </p>
          )}
        </div>

        {/* Résumé compact */}
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg p-3 border border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-300 font-medium text-sm">Progression</span>
            <Badge variant={isValid ? "success" : "error"} className="text-xs">
              {isValid ? "Valide" : "Invalide"}
            </Badge>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(filledCount / totalRequired) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {filledCount}/{totalRequired} champs requis et valides
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
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loading size="sm" />
                {submitLabel}...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {submitLabel}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 