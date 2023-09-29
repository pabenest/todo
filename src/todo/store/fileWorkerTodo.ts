import { type StoreGetter } from "@common/store/IStore";
import { Travailleur } from "@common/Travailleur";

import { fileTodoStore } from "./fileTodo";
import { type ITodoStore } from "./ITodoStore";

const travailleur = new Travailleur(__filename, fileTodoStore());

export const fileWorkerTodoStore = (() =>
  ({
    async add(todo) {
      await travailleur.run("add", todo);
    },
    async changeState(newState, todos) {
      await travailleur.run("changeState", newState, todos);
    },
    async remove(id) {
      await travailleur.run("remove", id);
    },
    async getAll() {
      return await travailleur.run("getAll");
    },
    async getTodoByStateTodo(state) {
      return await travailleur.run("getTodoByStateTodo", state);
    },
  }) as ITodoStore) satisfies StoreGetter<ITodoStore>;
