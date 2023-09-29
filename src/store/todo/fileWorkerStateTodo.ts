import { Travailleur } from "@common/Travailleur";
import { type StateTodoModel } from "@core/model/Todo";

import { fileStateTodoStore } from "./fileStateTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

const travailleur = new Travailleur(__filename, fileStateTodoStore);

export const fileWorkerStateTodoStore: IStateTodoStore = {
  async getDefault() {
    return travailleur.run("getDefault");
  },
  async add(stateTodo: StateTodoModel): Promise<void> {
    await travailleur.run("add", stateTodo);
  },
  async remove(id: number): Promise<void> {
    await travailleur.run("remove", id);
  },
  async getAll(): Promise<StateTodoModel[]> {
    return await travailleur.run("getAll");
  },
  async setDefault(id: number) {
    return await travailleur.run("setDefault", id);
  },
};
