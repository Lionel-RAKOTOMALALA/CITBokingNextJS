"use client";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { photoSchema } from "@/schemas/photo";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { trpc } from "@/trpc/client";

interface AddPhotoFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<{ url: string; hebergementId: string }>;
  submitLabel?: string;
}

export default function AddPhotoForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddPhotoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: hebergements, isLoading: isLoadingHebergements } = trpc.hebergement.list.useQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    resolver: zodResolver(photoSchema),
    defaultValues: initialValues || { url: "", hebergementId: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  useEffect(() => {
    if (initialValues?.url && initialValues.url.startsWith("http")) {
      setImagePreview(initialValues.url);
      setShowImagePreview(true);
    }
  }, [initialValues?.url]);

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
      setValue("url", data.url, { shouldValidate: true, shouldDirty: true });
      setImagePreview(data.url);
      setShowImagePreview(true);
    } else {
      alert(data.error || "Erreur lors de l’upload de l’image.");
    }
  };

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
      setImagePreview("");
      setShowImagePreview(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-white mb-4">Ajouter une photo</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Hébergement */}
        <div>
          <label className="block text-gray-300 mb-1">Hébergement *</label>
          <select
            {...register("hebergementId")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
            disabled={isLoadingHebergements}
            value={watch("hebergementId")}
            onChange={e => setValue("hebergementId", e.target.value, { shouldValidate: true, shouldDirty: true })}
          >
            <option value="">Sélectionner un hébergement</option>
            {hebergements && hebergements.map((h: any) => (
              <option key={h.id} value={h.id}>{h.nom}</option>
            ))}
          </select>
          {errors.hebergementId && <p className="text-red-500 text-xs mt-1">{errors.hebergementId.message}</p>}
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
                  setValue("url", "", { shouldValidate: true, shouldDirty: true });
                }}
              >
                Supprimer
              </Button>
            )}
          </div>
          {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>}
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
                {submitLabel}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 