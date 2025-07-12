"use client"
import AddCarForm from "@/components/voitures/AddCarForm"
import { useRouter } from "next/navigation"

export default function CreateVoiturePage() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    // Appelle ici ton API pour ajouter la voiture
    // await fetch("/api/voitures", { method: "POST", body: JSON.stringify(data) })
    router.push("/dashboard/voitures")
  }

  return (
    <AddCarForm
      onSubmit={handleSubmit}
      onCancel={() => router.push("/dashboard/voitures")}
    />
  )
} 