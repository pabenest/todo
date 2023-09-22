import dotenv from "dotenv";
import path from "path";

dotenv.config();

export type StoreType = "db" | "file" | "fileworker" | "memory" | "mock";

export const config = {
  rootPath: path.resolve(__dirname, "../"),
  store: {
    type: (process.env.APP_STORE_TYPE ?? "fileworker") as StoreType,
    db: {
      host: process.env.APP_POSTGRES_HOST ?? "localhost",
      port: +process.env.APP_POSTGRES_PORT! || 5432,
      database: process.env.APP_POSTGRES_DATABASE ?? "todo",
      user: process.env.APP_POSTGRES_USER ?? "postgres",
      password: process.env.APP_POSTGRES_PASSWORD ?? "postgres",
    },
  },
} as const;
