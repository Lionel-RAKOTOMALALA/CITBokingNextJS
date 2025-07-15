"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { hebergementSchema } from "@/schemas/hebergement";
import { HebergementFormData } from "@/types/hebergement";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";

interface AddHebergementFormProps {
  onSubmit: (data: HebergementFormData) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<HebergementFormData>;
  submitLabel?: string;
}

// Ajout du type pour les clés de progression
type HebergementFieldKey = keyof HebergementFormData;

export default function AddHebergementForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddHebergementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isValid, touchedFields }, reset } = useForm<HebergementFormData>({
    resolver: zodResolver(hebergementSchema),
    defaultValues: initialValues || { nom: "", description: "", localisation: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  // Typage explicite des clés
  const progressionFields: HebergementFieldKey[] = ["nom", "description", "localisation"];
  const filledCount = progressionFields.reduce((acc, key) => {
    if (
      typeof watchedFields[key] === "string" &&
      watchedFields[key].trim() !== "" &&
      !errors[key]
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const totalRequired = progressionFields.length;

  const handleFormSubmit = async (data: HebergementFormData) => {
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
          <Home className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Ajouter un hébergement</h2>
          <p className="text-slate-400 text-sm leading-tight">Ajoutez un nouvel hébergement à votre offre</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Nom */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Nom *
            {touchedFields.nom && !errors.nom && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              {...register("nom")}
              placeholder="Hôtel du Parc, Auberge de la Plage..."
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.nom ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.nom && !errors.nom ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.nom && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.nom && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.nom.message}
            </p>
          )}
          {touchedFields.nom && !errors.nom && !watchedFields.nom && (
            <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Description *
            {touchedFields.description && !errors.description && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Décrivez l'hébergement, ses atouts, etc."
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg border-slate-600 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-200 resize-none text-sm ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.description && !errors.description ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.description && <X className="absolute right-2 top-3 w-4 h-4 text-red-400" />}
          </div>
          {errors.description && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.description.message}
            </p>
          )}
          {touchedFields.description && !errors.description && !watchedFields.description && (
            <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
          )}
        </div>

        {/* Localisation */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Localisation *
            {touchedFields.localisation && !errors.localisation && <Check className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              {...register("localisation")}
              placeholder="Paris, Nice, Chamonix..."
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.localisation ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.localisation && !errors.localisation ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.localisation && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.localisation && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <X className="w-3 h-3" />
              {errors.localisation.message}
            </p>
          )}
          {touchedFields.localisation && !errors.localisation && !watchedFields.localisation && (
            <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
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
                <Home className="w-4 h-4" />
                {submitLabel}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 