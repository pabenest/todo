import { config } from "@common/config";
import path from "path";
import { type ConnectionOptions } from "typeorm-seeding";

// eslint-disable-next-line import/no-default-export
export default {
  type: "postgres",
  host: config.store.db.host,
  port: config.store.db.port,
  username: config.store.db.user,
  password: config.store.db.password,
  database: config.store.db.database,
  entities: [path.join(__dirname, "./entity/**/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "./subscriber/**/*{.ts,.js}")],
  seeds: [path.join(__dirname, "./seeding/seed/**/*{.ts,.js}")],
  factories: [path.join(__dirname, "./seeding/factory/**/*{.ts,.js}")],
  synchronize: config.nodeEnv === "development",
} as ConnectionOptions;
