import { getIncrement } from "@common/model/WithId";
import { type StoreGetter } from "@common/store/IStore";
import { type StateTodoModel } from "@core/model/Todo";

import { memoryTodoStore } from "../../todo/store/memoryTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

let storeStateTodo: StateTodoModel[] = [
  { id: 1, value: "A faire", isDefault: true },
  { id: 2, value: "A compléter", isDefault: false },
  { id: 3, value: "Terminé", isDefault: false },
];

//declare const memoryTodoStore: ITodoStore;

export const memoryStateTodoStore = ((): IStateTodoStore => ({
  add(stateTodo) {
    const id = getIncrement(storeStateTodo);
    storeStateTodo.push({ ...stateTodo, id });
  },
  findOne(id) {
    return storeStateTodo.find(x => x.id === id) ?? null;
  },
  getAll() {
    return [...storeStateTodo];
  },
  update(id, stateTodo) {
    const index = storeStateTodo.findIndex(x => x.id === id);
    if (index !== -1) {
      storeStateTodo[index] = { ...storeStateTodo[index], ...stateTodo };
    }
  },
  async remove(id) {
    const stateTodo = await this.findOne(id);

    if (stateTodo) {
      const todos = await memoryTodoStore().getTodoByStateTodoId(stateTodo.id);

      if (stateTodo.isDefault) {
        throw new Error("Vous ne pouvez pas supprimer l'état par défaut.");
      } else if (todos.length > 0) {
        throw new Error("Vous ne pouvez pas supprimer cet état, il est associé à un todo.");
      } else {
        storeStateTodo = storeStateTodo.filter(x => id !== x.id);
      }
    } else {
      throw new Error("L'identifiant de l'état n'existe pas.");
    }
  },
  getDefault() {
    const stateTodo = storeStateTodo.find(x => x.isDefault === true);

    if (!stateTodo) {
      return storeStateTodo[0];
    }
    return stateTodo;
  },
  setDefault(id) {
    const stateTodo = storeStateTodo.find(x => x.id === id);
    if (stateTodo) {
      //l'ancien n'est plus le par defaut.
      //les autres ne sont plus par défaut.
      for (const iterator of storeStateTodo) {
        iterator.isDefault = false;
      }

      stateTodo.isDefault = true;
    } else {
      throw new Error("L'identifiant de l'état n'existe pas.");
    }
  },
})) satisfies StoreGetter<IStateTodoStore>;
