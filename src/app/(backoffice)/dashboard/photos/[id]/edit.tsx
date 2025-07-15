import AddPhotoForm from "@/components/photos/AddPhotoForm";
import { trpc } from "@/trpc/client";
import { useRouter, useParams } from "next/navigation";

export default function PhotoEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const { data: photo, isLoading } = trpc.photo.get.useQuery({ id });
  const updatePhoto = trpc.photo.update.useMutation();

  if (isLoading) return <div className="p-6 text-center text-gray-400">Chargement...</div>;
  if (!photo) return <div className="p-6 text-center text-red-400">Photo introuvable</div>;

  return (
    <AddPhotoForm
      initialValues={photo}
      submitLabel="Enregistrer"
      onSubmit={async (data) => {
        await updatePhoto.mutateAsync({ ...data, id });
        router.push("/dashboard/photos");
      }}
      onCancel={() => router.push("/dashboard/photos")}
    />
  );
} 