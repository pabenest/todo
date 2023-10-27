import dotenv from "dotenv";
import path from "path";
import z from "zod";

dotenv.config();

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  APP_STORE_TYPE: z.enum(["db", "file", "fileworker", "memory", "mock"]).default("fileworker"),
  APP_POSTGRES_HOST: z.string().default("localhost"),
  APP_POSTGRES_PORT: z.coerce.number().default(5432),
  APP_POSTGRES_DATABASE: z.string().default("todo"),
  APP_POSTGRES_USER: z.string().default("postgres"),
  APP_POSTGRES_PASSWORD: z.string().default("postgres"),
});
export type Config = z.infer<typeof configSchema>;
export type StoreType = Config["APP_STORE_TYPE"];

const env = configSchema.parse(process.env);

export const config = {
  nodeEnv: env.NODE_ENV,
  db: {
    host: env.APP_POSTGRES_HOST,
    port: env.APP_POSTGRES_PORT,
    database: env.APP_POSTGRES_DATABASE,
    user: env.APP_POSTGRES_USER,
    password: env.APP_POSTGRES_PASSWORD,
  },
} as const;
export const ROOT_PATH = path.resolve(__dirname, "../");
