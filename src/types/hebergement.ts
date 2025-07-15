import { z } from "zod";
import { hebergementSchema } from "@/schemas/hebergement";
 
export type HebergementFormData = z.infer<typeof hebergementSchema>; 