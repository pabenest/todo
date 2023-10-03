import z from "zod";

export const createTodoDtoSchema = z.object({
  value: z.string(),
  state: z.number(),
});

export type CreateTodoDto = z.infer<typeof createTodoDtoSchema>;
