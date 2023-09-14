import path from "path";

export type StoreType = "db" | "file" | "memory" | "mock";

export const config = {
  rootPath: path.resolve(__dirname, "../"),
  store: {
    type: "file" as StoreType,
  },
};
