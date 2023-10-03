import { type StoreGetter } from "@common/store/IStore";
import { Travailleur } from "@common/Travailleur";

import { fileTodoStore } from "./fileTodo";
import { type ITodoStore } from "./ITodoStore";

const travailleur = new Travailleur(__filename, fileTodoStore());

export const fileWorkerTodoStore = ((): ITodoStore => ({
  async add(todo) {
    await travailleur.run("add", todo);
  },
  async changeState(newState, todos) {
    await travailleur.run("changeState", newState, todos);
  },
  async remove(id) {
    await travailleur.run("remove", id);
  },
  async findOne(id) {
    return travailleur.run("findOne", id);
  },
  async update(id, todo) {
    await travailleur.run("update", id, todo);
  },
  async getAll() {
    return travailleur.run("getAll");
  },
  async getTodoByStateTodoId(state) {
    return travailleur.run("getTodoByStateTodoId", state);
  },
})) satisfies StoreGetter<ITodoStore>;
