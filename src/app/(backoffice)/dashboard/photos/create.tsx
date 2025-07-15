import AddPhotoForm from "@/components/photos/AddPhotoForm";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

export default function PhotoCreatePage() {
  const router = useRouter();
  const createPhoto = trpc.photo.create.useMutation();

  return (
    <AddPhotoForm
      onSubmit={async (data) => {
        await createPhoto.mutateAsync(data);
        router.push("/dashboard/photos");
      }}
      onCancel={() => router.push("/dashboard/photos")}
    />
  );
} 