import z from "zod";

export const createStateTodoDtoSchema = z
  .object({
    value: z.string(),
    isDefault: z.boolean(),
    isStart: z.boolean(),
    isEnd: z.boolean(),
  })
  .refine(
    ({ isEnd, isStart }) => !(isEnd && isStart),
    () => ({
      message: "isEnd and isStart cannot be true at the same time",
    }),
  );

export type CreateStateTodoDto = z.infer<typeof createStateTodoDtoSchema>;
