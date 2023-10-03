import z from "zod";

export const updateTodoDtoSchema = z.object({
  value: z.string().optional(),
  state: z.number().optional(),
});

export type UpdateTodoDto = z.infer<typeof updateTodoDtoSchema>;
