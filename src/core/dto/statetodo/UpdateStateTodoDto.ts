import z from "zod";

export const updateStateTodoDtoSchema = z
  .object({
    value: z.string().optional(),
    isDefault: z.boolean().optional(),
    isStart: z.boolean().optional(),
    isEnd: z.boolean().optional(),
  })
  .refine(
    ({ isEnd, isStart }) => !(isEnd && isStart),
    () => ({
      message: "isEnd and isStart cannot be true at the same time",
    }),
  );

export type UpdateStateTodoDto = z.infer<typeof updateStateTodoDtoSchema>;
