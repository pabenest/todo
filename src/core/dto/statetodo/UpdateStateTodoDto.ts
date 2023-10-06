import z from "zod";

export const updateStateTodoDtoSchema = z.object({
  value: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type UpdateStateTodoDto = z.infer<typeof updateStateTodoDtoSchema>;
