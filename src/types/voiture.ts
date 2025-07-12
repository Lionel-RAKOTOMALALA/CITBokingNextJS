import { z } from "zod"
import { voitureSchema } from "@/lib/validation/voitureSchema"

export type VoitureFormData = z.infer<typeof voitureSchema> 