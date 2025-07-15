"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoPriveeSchema } from "@/schemas/videoPrivee";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { trpc } from "@/trpc/client";
import { useRef } from "react";

interface AddVideoPriveeFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<{ url: string; titre: string; privee: boolean; hebergementId: string }>;
  submitLabel?: string;
}

export default function AddVideoPriveeForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddVideoPriveeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: hebergements, isLoading: isLoadingHebergements } = trpc.hebergement.list.useQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(videoPriveeSchema),
    defaultValues: initialValues || { url: "", titre: "", privee: true, hebergementId: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>(initialValues?.url || "");
  const [videoName, setVideoName] = useState<string>("");

  useEffect(() => {
    if (initialValues?.url) {
      setVideoUrl(initialValues.url);
      setVideoName(initialValues.url.split("/").pop() || "Vidéo existante");
    }
  }, [initialValues?.url]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoName(file.name);
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
      alert("Erreur lors de l’upload de la vidéo. (Réponse invalide)");
      return;
    }
    if (data.url) {
      setValue("url", data.url, { shouldValidate: true, shouldDirty: true });
      setVideoUrl(data.url);
    } else {
      alert(data.error || "Erreur lors de l’upload de la vidéo.");
    }
  };

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-6">
      <div>
        <label className="block text-gray-300 mb-1">Titre *</label>
        <input {...register("titre")} className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700" />
        {errors.titre && <p className="text-red-500 text-xs mt-1">{errors.titre.message}</p>}
      </div>
      <div>
        <label className="block text-gray-300 mb-1">Vidéo *</label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="video/*"
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
            Uploader une vidéo
          </Button>
          {videoUrl && (
            <span className="text-xs text-green-400">{videoName || "Vidéo uploadée"}</span>
          )}
          {videoUrl && (
            <Button
              type="button"
              variant="ghost"
              className="text-xs text-red-400"
              onClick={() => {
                setVideoUrl("");
                setVideoName("");
                setValue("url", "", { shouldValidate: true, shouldDirty: true });
              }}
            >
              Supprimer
            </Button>
          )}
        </div>
        {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>}
      </div>
      <div>
        <label className="block text-gray-300 mb-1">Hébergement *</label>
        <select
          {...register("hebergementId")}
          className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
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
      <div>
        <label className="block text-gray-300 mb-1">Privée ?</label>
        <input type="checkbox" {...register("privee")} />
      </div>
      <div className="flex gap-3 pt-3 border-t border-slate-700">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Annuler</Button>
        <Button type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? <Loading size="sm" /> : submitLabel}</Button>
      </div>
    </form>
  );
} 