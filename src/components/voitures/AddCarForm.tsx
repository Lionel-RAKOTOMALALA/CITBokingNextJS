"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voitureSchema } from "@/lib/validation/voitureSchema";
import { VoitureFormData } from "@/types/voiture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";
import { Car, Check, X, ImageIcon, DollarSign, Eye, EyeOff } from "lucide-react";

interface AddCarFormProps {
  onSubmit: (data: VoitureFormData) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<VoitureFormData>;
  submitLabel?: string;
}

// Ajout d'un utilitaire pour valider l'URL d'image
function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return /\.(jpe?g|png|webp|gif)$/i.test(url);
  } catch {
    return false;
  }
}

export default function AddCarForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddCarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Correction : initialiser la preview d'image si on édite
  useEffect(() => {
    if (initialValues?.image && isValidImageUrl(initialValues.image)) {
      setImagePreview(initialValues.image);
      setShowImagePreview(true);
    }
  }, [initialValues?.image]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, touchedFields, dirtyFields },
  } = useForm<VoitureFormData>({
    resolver: zodResolver(voitureSchema),
    defaultValues: initialValues || {
      marque: "",
      modele: "",
      prixParJour: undefined,
      image: "",
      disponible: undefined,
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  // Supprimer tous les useEffect liés à initialValues.image ou watchedFields.image
  // Laisser uniquement la logique d'origine :
  // - setImagePreview/setShowImagePreview dans handleFileChange, handleImageUrlChange, handleClose
  // - reset efface l'aperçu

  // Correction: use dirtyFields for progression, not just raw values
  const progressionFields = [
    "marque",
    "modele",
    "prixParJour",
    "image",
    "disponible",
  ];
  // Compte uniquement les champs obligatoires remplis ET valides
  const filledCount = progressionFields.reduce((acc, key) => {
    if (
      (key === "marque" || key === "modele") &&
      typeof watchedFields[key] === "string" &&
      watchedFields[key].trim() !== "" &&
      !errors[key]
    ) {
      return acc + 1;
    }
    if (
      key === "prixParJour" &&
      typeof watchedFields[key] === "number" &&
      watchedFields[key] !== null &&
      watchedFields[key] !== undefined &&
      !errors[key]
    ) {
      return acc + 1;
    }
    if (
      key === "image" &&
      typeof watchedFields[key] === "string" &&
      watchedFields[key].startsWith("https://") &&
      watchedFields[key].includes("vercel-storage.com") &&
      /\.(jpe?g|png|webp|gif)$/i.test(watchedFields[key]) &&
      !errors[key]
    ) {
      return acc + 1;
    }
    if (
      key === "disponible" &&
      typeof watchedFields[key] === "boolean"
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const totalRequired = progressionFields.length;

  const watchedDisponible = watch("disponible");

  const handleImageUrlChange = (url: string) => {
    setValue("image", url, { shouldValidate: true });
    if (url && url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      setImagePreview(url);
      setShowImagePreview(true);
    } else {
      setImagePreview("");
      setShowImagePreview(false);
    }
  };

  // Fonction d'upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      alert("Erreur lors de l’upload de l’image. (Réponse invalide)");
      return;
    }
    if (data.url) {
      setValue("image", data.url, { shouldValidate: true });
      setImagePreview(data.url);
      setShowImagePreview(true);
    } else {
      alert(data.error || "Erreur lors de l’upload de l’image.");
    }
  };

  const handleFormSubmit = async (data: VoitureFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Form data submitted:', data);
      await onSubmit(data);
      reset();
      setImagePreview("");
      setShowImagePreview(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dans handleClose, effacer l'aperçu et faire reset
  const handleClose = () => {
    reset(initialValues || undefined);
    setImagePreview("");
    setShowImagePreview(false);
    onCancel();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
          <Car className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Ajouter un véhicule</h2>
          <p className="text-slate-400 text-sm leading-tight">Enrichissez votre parc automobile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Informations de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Marque */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              Marque *
              {touchedFields.marque && !errors.marque && <Check className="w-4 h-4 text-green-400" />}
            </label>
            <div className="relative">
              <Input
                {...register("marque")}
                placeholder="Toyota, Peugeot..."
                className={`text-sm h-10 px-3 ${
                  errors.marque
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : touchedFields.marque && !errors.marque
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : ""
                }`}
              />
              {errors.marque && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
            </div>
            {errors.marque && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <X className="w-3 h-3" />
                {errors.marque.message}
              </p>
            )}
            {touchedFields.marque && !errors.marque && !watchedFields.marque && (
              <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
            )}
          </div>

          {/* Modèle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              Modèle *
              {touchedFields.modele && !errors.modele && <Check className="w-4 h-4 text-green-400" />}
            </label>
            <div className="relative">
              <Input
                {...register("modele")}
                placeholder="Corolla, 208..."
                className={`text-sm h-10 px-3 ${
                  errors.modele
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : touchedFields.modele && !errors.modele
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : ""
                }`}
              />
              {errors.modele && <X className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
            </div>
            {errors.modele && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <X className="w-3 h-3" />
                {errors.modele.message}
              </p>
            )}
            {touchedFields.modele && !errors.modele && !watchedFields.modele && (
              <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
            )}
          </div>
        </div>

        {/* Prix et Disponibilité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Prix */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              Prix/jour (€) *
              {touchedFields.prixParJour && !errors.prixParJour && <Check className="w-4 h-4 text-green-400" />}
            </label>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                min="0"
                {...register("prixParJour", { valueAsNumber: true })}
                placeholder="45.00"
                className={`text-sm h-10 px-3 ${
                  errors.prixParJour
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : touchedFields.prixParJour && !errors.prixParJour
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                    : ""
                }`}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">€</div>
            </div>
            {errors.prixParJour && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                <X className="w-3 h-3" />
                {errors.prixParJour.message}
              </p>
            )}
            {touchedFields.prixParJour && !errors.prixParJour && !watchedFields.prixParJour && (
              <p className="text-orange-400 text-xs mt-1">Ce champ est requis.</p>
            )}
          </div>

          {/* Disponibilité */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Disponibilité *</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValue("disponible", true, { shouldValidate: true })}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  watchedDisponible === true
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${watchedDisponible === true ? "bg-white" : "bg-green-400"}`} />
                Disponible
              </button>
              <button
                type="button"
                onClick={() => setValue("disponible", false, { shouldValidate: true })}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  watchedDisponible === false
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${watchedDisponible === false ? "bg-white" : "bg-red-400"}`} />
                Indisponible
              </button>
            </div>
            {watchedDisponible === undefined && (
              <p className="text-orange-400 text-xs mt-1">Sélectionnez la disponibilité.</p>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Image du véhicule *
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-200"
          />
          {/* Affichage de la prévisualisation si imagePreview existe */}
          {imagePreview && (
            <div className="relative w-full h-24 bg-slate-700 rounded-lg overflow-hidden border border-slate-600 mt-2">
              <img src={imagePreview} alt="Prévisualisation" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Description (optionnel)</label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Décrivez les caractéristiques du véhicule..."
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-200 resize-none text-sm"
          />
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
            onClick={handleClose}
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
                <Car className="w-4 h-4" />
                {submitLabel}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}