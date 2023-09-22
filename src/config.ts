import path from "path";

export type StoreType = "db" | "file" | "fileworker" | "memory" | "mock";

export const config = {
  rootPath: path.resolve(__dirname, "../"),
  store: {
    type: "fileworker" as StoreType,
  },
};
