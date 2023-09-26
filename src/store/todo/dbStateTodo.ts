import { error } from "console";

import { stateTodoRepository } from "../../db/repo";
import { type IStateTodoStore } from "./IStateTodoStore";

export const dbStateTodoStore: IStateTodoStore = {
  async add(stateTodo) {
    await stateTodoRepository.insert({
      value: stateTodo.value,
      isDefault: stateTodo.isDefault,
    });
  },
  async getAll() {
    const entities = await stateTodoRepository.find();
    return entities.map(x => ({ id: x.id, value: x.value, isDefault: x.isDefault }));
  },
  async remove(id) {
    console.log("id a supp" + id);
    const stateTodo = await stateTodoRepository.findOne({
      where: { id },
      relations: {
        todos: true,
      },
    });

    if (stateTodo) {
      if (stateTodo.isDefault) {
        throw new Error("Vous ne pouvez pas supprimer l'état par défaut.");
        // } else if (stateTodo.todos.length > 0) {
        //   console.log(stateTodo.todos);
        //   throw new Error("Vous ne pouvez pas supprimer cet état, il est associé à un todo.");
      } else {
        console.log("id a supp" + id);
        await stateTodoRepository.delete(id);
      }
    } else {
      throw new Error("L'identifiant de l'état n'existe pas.");
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
  async setDefault(id) {
    const stateTodos = await this.getAll();
    const hasStateTodo = stateTodos.find(stateTodo => stateTodo.id === id);
    if (hasStateTodo) {
      //les autres ne sont plus par défaut.
      for (const stateTodo of stateTodos) {
        if (stateTodo.id !== id) {
          stateTodo.isDefault = false;
        } else {
          stateTodo.isDefault = true;
        }
      }
      await stateTodoRepository.save(stateTodos);
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
};
