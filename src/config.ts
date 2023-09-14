export type StoreType = "db" | "file" | "memory" | "mock";

export const config = {
  store: {
    type: "file" as StoreType,
    filePath: __dirname,
  },
};
