"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { utilisateurSchema } from "@/schemas/utilisateur";
import { Utilisateur } from "@/types/schemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaUser, FaCheck, FaTimes, FaKey } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Loading } from "@/components/ui/loading";

interface AddUtilisateurFormProps {
  onSubmit: (data: Utilisateur) => Promise<void>;
  onCancel: () => void;
  initialValues?: Partial<Utilisateur>;
  submitLabel?: string;
}

type UtilisateurFieldKey = keyof Utilisateur;

const roles = ["CLIENT", "ADMIN", "GESTIONNAIRE"] as const;

export default function AddUtilisateurForm({ onSubmit, onCancel, initialValues, submitLabel = "Ajouter" }: AddUtilisateurFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors, isValid, touchedFields }, reset } = useForm<Utilisateur>({
    resolver: zodResolver(utilisateurSchema),
    defaultValues: initialValues || { nom: "", email: "", motDePasse: "", role: undefined, clerkUserId: "" },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const watchedFields = watch();
  const progressionFields: UtilisateurFieldKey[] = ["nom", "email", "motDePasse"];
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

  const handleFormSubmit = async (data: Utilisateur) => {
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
          <FaUser className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Ajouter un utilisateur</h2>
          <p className="text-slate-400 text-sm leading-tight">Ajoutez un nouvel utilisateur au système</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Nom */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Nom *
            {touchedFields.nom && !errors.nom && <FaCheck className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              {...register("nom")}
              placeholder="Jean Dupont, Marie Martin..."
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.nom ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.nom && !errors.nom ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.nom && <FaTimes className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.nom && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <FaTimes className="w-3 h-3" />
              {errors.nom.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Email *
            {touchedFields.email && !errors.email && <FaCheck className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              {...register("email")}
              type="email"
              placeholder="exemple@email.com"
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.email && !errors.email ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.email && <FaTimes className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.email && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <FaTimes className="w-3 h-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Mot de passe *
            {touchedFields.motDePasse && !errors.motDePasse && <FaCheck className="w-4 h-4 text-green-400" />}
          </label>
          <div className="relative">
            <input
              {...register("motDePasse")}
              type="password"
              placeholder="••••••••"
              className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 border-slate-600 focus:border-orange-500 focus:ring-orange-500 ${errors.motDePasse ? "border-red-500 focus:border-red-500 focus:ring-red-500" : touchedFields.motDePasse && !errors.motDePasse ? "border-green-500 focus:border-green-500 focus:ring-green-500" : ""}`}
            />
            {errors.motDePasse && <FaKey className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />}
          </div>
          {errors.motDePasse && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <FaTimes className="w-3 h-3" />
              {errors.motDePasse.message}
            </p>
          )}
        </div>

        {/* Rôle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            Rôle
            {touchedFields.role && !errors.role && <FaCheck className="w-4 h-4 text-green-400" />}
          </label>
          <select
            {...register("role")}
            className={`text-sm h-10 px-3 w-full rounded-lg border bg-slate-800 text-slate-200 focus:outline-none border-slate-600 focus:border-orange-500 ${errors.role ? "border-red-500 focus:border-red-500" : touchedFields.role && !errors.role ? "border-green-500 focus:border-green-500" : ""}`}
          >
            <option value="">Sélectionner un rôle</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
              <FaTimes className="w-3 h-3" />
              {errors.role.message}
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
                <FaUser className="w-4 h-4" />
                {submitLabel}
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 