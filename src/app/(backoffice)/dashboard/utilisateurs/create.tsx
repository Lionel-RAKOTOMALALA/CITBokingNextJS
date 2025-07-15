import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { utilisateurSchema } from "@/schemas/utilisateur";
import { trpc } from "@/trpc/client";
import { z } from "zod";

const roles = ["CLIENT", "ADMIN", "GESTIONNAIRE"] as const;

type FormData = z.infer<typeof utilisateurSchema>;

export default function UtilisateurCreatePage() {
  const utils = trpc.useUtils();
  const { mutate, isPending, error } = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.list.invalidate();
      // Rediriger ou afficher un message de succès
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(utilisateurSchema),
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-8">
      <h2 className="text-xl font-bold text-white mb-4">Créer un nouvel utilisateur</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Nom</label>
          <input
            type="text"
            {...register("nom")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Mot de passe</label>
          <input
            type="password"
            {...register("motDePasse")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.motDePasse && <p className="text-red-500 text-xs mt-1">{errors.motDePasse.message}</p>}
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Rôle</label>
          <select
            {...register("role")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          >
            <option value="">Sélectionner un rôle</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Clerk User ID</label>
          <input
            type="text"
            {...register("clerkUserId")}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-orange-500"
          />
          {errors.clerkUserId && <p className="text-red-500 text-xs mt-1">{errors.clerkUserId.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded transition"
          disabled={isPending}
        >
          {isPending ? "Création..." : "Créer l'utilisateur"}
        </button>
        {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
      </form>
    </div>
  );
} 