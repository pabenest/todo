import z from "zod";

export const createStateTodoDtoSchema = z.object({
  value: z.string(),
  isDefault: z.boolean(),
});

export type CreateStateTodoDto = z.infer<typeof createStateTodoDtoSchema>;
