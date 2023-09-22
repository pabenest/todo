import { type ConnectionOptions } from "typeorm-seeding";

import { config } from "../config";
import { StateTodo } from "./entity/StateTodo";
import { Todo } from "./entity/Todo";

// eslint-disable-next-line import/no-default-export
export default {
  type: "postgres",
  host: config.store.db.host,
  port: config.store.db.port,
  username: config.store.db.user,
  password: config.store.db.password,
  database: config.store.db.database,
  entities: [Todo, StateTodo],
  seeds: ["src/db/seeding/seed/**/*{.ts,.js}"],
  factories: ["src/db/seeding/factory/**/*{.ts,.js}"],
} as ConnectionOptions;
