import { z } from "zod"

export const assessmentSchema = z.object({
  painAreas: z
    .array(z.string())
    .min(1, "Please select at least one area where you feel discomfort."),
  
  painIntensity: z.record(
    z.string(),
    z.number()
      .int()
      .min(0, "Intensity cannot be negative.")
      .max(10, "Intensity cannot exceed 10.")
  ),

  mobilityDifficulty: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      difficulty: z.number().min(0).max(10),
      area: z.string()
    })
  ).min(1, "Please complete the mobility assessment section."),

  dailyImpact: z.array(
    z.object({
      id: z.string(),
      category: z.enum(['work', 'sleep', 'activity']),
      impact: z.number().min(0).max(10),
      description: z.string()
    })
  ).min(1, "Please complete the daily impact section."),

  notes: z.string().optional()
})

export type AssessmentFormValues = z.infer<typeof assessmentSchema>
