import dotenv from "dotenv";
import path from "path";

dotenv.config();

export type StoreType = "db" | "file" | "memory" | "mock";

const rootPath = path.resolve(__dirname, "../..");

export const config = {
  store: {
    type: (process.env.APP_STORE_TYPE ?? "file") as StoreType,
    filePath: path.resolve(rootPath, process.env.APP_STORE_FILE_PATH ?? "store.json"),
  },
} as const;
