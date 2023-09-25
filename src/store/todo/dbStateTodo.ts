import { error } from "console";

import { stateTodoRepository } from "../../db/repo";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { dbTodoStore } from "./dbTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

export const dbStateTodoStore: IStateTodoStore = {
  async add(stateTodo: StateTodoModel) {
    await stateTodoRepository.insert({
      value: stateTodo.value,
      isDefault: stateTodo.isDefault,
    });
  },
  async getAll() {
    const entities = await stateTodoRepository.find();
    return entities.map(x => ({ id: x.id, value: x.value, isDefault: x.isDefault }));
  },
  async remove(id: number) {
    console.log("id a supp" + id);
    const stateTodo = await stateTodoRepository.findOne({ where: { id } });

    if (stateTodo) {
      const todos: TodoModel[] = await dbTodoStore.getTodoByStateTodo(stateTodo);

      if (stateTodo.isDefault === true) {
        throw error("Vous ne pouvez pas supprimer l'état par défaut.");
      } else if (todos.length > 0) {
        console.log(todos);
        throw error("Vous ne pouvez pas supprimer cet état, il est associé à un todo.");
      } else {
        console.log("id a supp" + id);
        await stateTodoRepository.delete(id);
      }
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
  async getDefault() {
    const defaultState = await stateTodoRepository.findOne({ where: { isDefault: true } });
    if (!defaultState) throw new Error("No default state found. Please seed the database.");

    return {
      id: defaultState.id,
      value: defaultState.value,
      isDefault: true,
    };
  },
  async setDefault(id: number) {
    const stateTodo = await stateTodoRepository.findOne({ where: { id } });
    if (stateTodo) {
      const stateTodos = await this.getAll();
      //les autres ne sont plus par défaut.
      for (const iterator of stateTodos) {
        iterator.isDefault = false;
      }
      await stateTodoRepository.save(stateTodos);
      stateTodo.isDefault = true;
      await stateTodoRepository.save(stateTodo);
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
};
