import { type Connection } from "typeorm";
import { type Factory, type Seeder } from "typeorm-seeding";

import { StateTodo } from "../../entity/StateTodo";

// eslint-disable-next-line import/no-default-export
export default class CreateStateTodos implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection.synchronize();
    const repo = connection.getRepository(StateTodo);
    const hasStateTodos = await repo.count();
    if (hasStateTodos) return;

    await connection.getRepository(StateTodo).save([
      { value: "A faire", isDefault: true },
      { value: "A compléter", isDefault: false },
      { value: "Terminé", isDefault: false },
    ]);
  }
}
