import { error } from "console";

import { getIncrement } from "../../common/model/WithId";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { type IStateTodoStore } from "./IStateTodoStore";
import { memoryTodoStore } from "./memoryTodo";

let storeStateTodo: StateTodoModel[] = [
  { id: 1, value: "A faire", isDefault: true },
  { id: 2, value: "A compléter", isDefault: false },
  { id: 3, value: "Terminé", isDefault: false },
];

export const memoryStateTodoStore: IStateTodoStore = {
  add(stateTodo: StateTodoModel): void {
    const id = getIncrement(storeStateTodo);
    storeStateTodo.push({ ...stateTodo, id });
  },
  getAll(): StateTodoModel[] {
    return [...storeStateTodo];
  },
  async remove(id: number) {
    const stateTodo = storeStateTodo.find(x => x.id === id);

    if (stateTodo) {
      const todos: TodoModel[] = await memoryTodoStore.getTodoByStateTodo(stateTodo);

      if (stateTodo.isDefault === true) {
        throw error("Vous ne pouvez pas supprimer l'état par défaut.");
      } else if (todos.length > 0) {
        throw error("Vous ne pouvez pas supprimer cet état, il est associé à un todo.");
      } else {
        storeStateTodo = storeStateTodo.filter(x => id !== x.id);
      }
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
  getDefault() {
    let stateTodo = storeStateTodo.find(x => x.isDefault === true);

    if (stateTodo === undefined) {
      stateTodo = storeStateTodo[0];
    }
    return stateTodo;
  },
  setDefault(id: number) {
    const stateTodo = storeStateTodo.find(x => x.id === id);
    if (stateTodo) {
      //l'ancien n'est plus le par defaut.
      //les autres ne sont plus par défaut.
      for (const iterator of storeStateTodo) {
        iterator.isDefault = false;
      }

      stateTodo.isDefault = true;
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
};