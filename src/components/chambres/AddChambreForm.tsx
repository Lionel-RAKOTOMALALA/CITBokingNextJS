"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chambreSchema } from "@/schemas/chambre";
import { ChambreFormData } from "@/types/chambre";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BedDouble, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";
import { trpc } from "@/trpc/client";

interface AddChambreFormProps {
  onSubmit: (data: ChambreFormData) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<ChambreFormData>;
  submitLabel?: string;
}

type ChambreFieldKey = keyof ChambreFormData;

export default function AddChambreForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddChambreFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isValid, touchedFields }, reset, setValue } = useForm<ChambreFormData>({
    resolver: zodResolver(chambreSchema),
    defaultValues: initialValues || { numero: "", disponible: true, hebergementId: "", typeChambreId: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  const progressionFields: ChambreFieldKey[] = ["numero", "hebergementId", "typeChambreId"];
  const filledCount = progressionFields.reduce((acc, key) => {
    if (
      typeof watchedFields[key] === "string" && watchedFields[key].trim() !== "" && !errors[key]
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const totalRequired = progressionFields.length;

  // Fetch hebergements et typeChambres pour les dropdowns
  const { data: hebergements, isLoading: loadingHebergements } = trpc.hebergement.list.useQuery();
  const { data: typeChambres, isLoading: loadingTypeChambres } = trpc.typeChambre.list.useQuery();

  const handleFormSubmit = async (data: ChambreFormData) => {
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
          <BedDouble className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Ajouter une chambre</h2>
          <p className="text-slate-400 text-sm leading-tight">Ajoutez une nouvelle chambre à votre offre</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Numéro */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Numéro *
            {touchedFields.numero && !errors.numero && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              {...register("numero")}
              placeholder="101, 202, Suite 1..."
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.numero ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.numero && !errors.numero ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.numero && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.numero && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.numero.message}
            </p>
          )}
          {touchedFields.numero && !errors.numero && !watchedFields.numero && (
            <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
          )}
        </div>

        {/* Hébergement */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Hébergement *
            {touchedFields.hebergementId && !errors.hebergementId && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <select
              {...register("hebergementId")}
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.hebergementId ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.hebergementId && !errors.hebergementId ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
              disabled={loadingHebergements}
              defaultValue={initialValues?.hebergementId || ""}
            >
              <option value="" disabled>Choisir un hébergement</option>
              {hebergements?.map((h: any) => (
                <option key={h.id} value={h.id}>{h.nom}</option>
              ))}
            </select>
            {errors.hebergementId && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.hebergementId && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.hebergementId.message}
            </p>
          )}
        </div>

        {/* Type de chambre */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Type de chambre *
            {touchedFields.typeChambreId && !errors.typeChambreId && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <select
              {...register("typeChambreId")}
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.typeChambreId ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.typeChambreId && !errors.typeChambreId ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
              disabled={loadingTypeChambres}
              defaultValue={initialValues?.typeChambreId || ""}
            >
              <option value="" disabled>Choisir un type de chambre</option>
              {typeChambres?.map((t: any) => (
                <option key={t.id} value={t.id}>{t.nom}</option>
              ))}
            </select>
            {errors.typeChambreId && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.typeChambreId && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.typeChambreId.message}
            </p>
          )}
        </div>

        {/* Disponible */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="disponible"
            {...register("disponible")}
            checked={watchedFields.disponible}
            onChange={e => setValue("disponible", e.target.checked)}
            className="accent-orange-500 w-4 h-4"
          />
          <label htmlFor="disponible" className="text-sm text-slate-300 select-none cursor-pointer">
            Disponible
          </label>
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
                <BedDouble className="w-4 h-4" />
                {submitLabel}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 