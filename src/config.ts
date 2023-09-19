import path from "path";

export type StoreType = "db" | "file" | "fileworker" | "fileWorkerThread" | "memory" | "memoryWorkerThread" | "mock";

export const config = {
  rootPath: path.resolve(__dirname, "../"),
  store: {
    type: "fileWorkerThread" as StoreType,
  },
};
