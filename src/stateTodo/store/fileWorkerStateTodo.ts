import { type StoreGetter } from "@common/store/IStore";
import { Travailleur } from "@common/Travailleur";

import { fileStateTodoStore } from "./fileStateTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

const travailleur = new Travailleur(__filename, fileStateTodoStore());

export const fileWorkerStateTodoStore = (() =>
  ({
    async getDefault() {
      return travailleur.run("getDefault");
    },
    async findOne(id) {
      return await travailleur.run("findOne", id);
    },
    async add(stateTodo) {
      await travailleur.run("add", stateTodo);
    },
    async remove(id) {
      await travailleur.run("remove", id);
    },
    async getAll() {
      return await travailleur.run("getAll");
    },
    async setDefault(id) {
      return await travailleur.run("setDefault", id);
    },
  }) as IStateTodoStore) satisfies StoreGetter<IStateTodoStore>;
