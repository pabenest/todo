export type StoreType = "db" | "file" | "memory" | "mock";

export const config = {
  store: {
    type: "memory" as StoreType,
  },
};
