"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activiteSchema } from "@/schemas/activite";
import { Activite } from "@/types/schemas";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";

interface AddActiviteFormProps {
  onSubmit: (data: Activite) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<Activite>;
  submitLabel?: React.ReactNode;
  isSubmitting?: boolean;
  errorMsg?: string | null;
}

type ActiviteFieldKey = keyof Activite;

export default function AddActiviteForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter", isSubmitting = false, errorMsg }: AddActiviteFormProps) {
  const { register, handleSubmit, watch, formState: { errors, isValid, touchedFields }, reset, setValue } = useForm<Activite>({
    resolver: zodResolver(activiteSchema),
    defaultValues: initialValues || { nom: "", description: "", prixParPersonne: 0, localisation: "", image: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  const progressionFields: ActiviteFieldKey[] = ["nom", "description", "prixParPersonne", "localisation", "image"];
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

  const [imagePreview, setImagePreview] = useState<string>("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValues?.image && initialValues.image.startsWith("http")) {
      setImagePreview(initialValues.image);
      setShowImagePreview(true);
    }
  }, [initialValues?.image]);

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
      setValue("image", data.url, { shouldValidate: true, shouldDirty: true });
      setImagePreview(data.url);
      setShowImagePreview(true);
    } else {
      alert(data.error || "Erreur lors de l’upload de l’image.");
    }
  };

  const handleFormSubmit = async (data: Activite) => {
    await onSubmit(data);
    reset();
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-white mb-4">{submitLabel === "Ajouter" ? "Ajouter une activité" : "Modifier l'activité"}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block text-gray-300 mb-1">Nom *</label>
          <input
            type="text"
            {...register("nom")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-300 mb-1">Description *</label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>
        {/* Prix par personne */}
        <div>
          <label className="block text-gray-300 mb-1">Prix par personne (€) *</label>
          <input
            type="number"
            step="0.01"
            {...register("prixParPersonne", { valueAsNumber: true })}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.prixParPersonne && <p className="text-red-500 text-xs mt-1">{errors.prixParPersonne.message}</p>}
        </div>
        {/* Localisation */}
        <div>
          <label className="block text-gray-300 mb-1">Localisation *</label>
          <input
            type="text"
            {...register("localisation")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.localisation && <p className="text-red-500 text-xs mt-1">{errors.localisation.message}</p>}
        </div>
        {/* Image */}
        <div>
          <label className="block text-gray-300 mb-1">Image *</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="text-xs"
              onClick={() => fileInputRef.current?.click()}
            >
              Uploader une image
            </Button>
            {imagePreview && showImagePreview && (
              <img src={imagePreview} alt="Aperçu" className="w-16 h-16 object-cover rounded border border-gray-700" />
            )}
            {imagePreview && showImagePreview && (
              <Button
                type="button"
                variant="ghost"
                className="text-xs text-red-400"
                onClick={() => {
                  setImagePreview("");
                  setShowImagePreview(false);
                  setValue("image", "", { shouldValidate: true, shouldDirty: true });
                }}
              >
                Supprimer
              </Button>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
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