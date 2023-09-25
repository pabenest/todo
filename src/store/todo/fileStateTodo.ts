import { error } from "console";
import { readFile, writeFile } from "fs/promises";
import path from "path";

import { getIncrement } from "../../common/model/WithId";
import { config } from "../../config";
import { type StateTodoModel, type TodoModel } from "../../model/Todo";
import { fileTodoStore } from "./fileTodo";
import { type IStateTodoStore } from "./IStateTodoStore";

const STORE_FILE = path.resolve(config.rootPath, "src/store/todo/stateTodo.json");

const getPersistStateTodo = async (): Promise<StateTodoModel[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as StateTodoModel[];
  } catch (error) {
    return [];
  }
};

const saveStore = async (store: StateTodoModel[]): Promise<void> => {
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2));
};

export const fileStateTodoStore: IStateTodoStore = {
  async getDefault() {
    const store = await getPersistStateTodo();
    let stateTodo = store.find(x => x.isDefault === true);

    if (stateTodo === undefined) {
      stateTodo = store[0];
    }
    return stateTodo;
  },
  async add(stateTodo: StateTodoModel): Promise<void> {
    const store = await this.getAll();
    const id = getIncrement(store);
    store.push({ ...stateTodo, id });
    await saveStore(store);
  },
  async remove(id: number): Promise<void> {
    const states = await getPersistStateTodo();

    const stateTodo = states.find(x => x.id === id);

    if (stateTodo) {
      const todos: TodoModel[] = await fileTodoStore.getTodoByStateTodo(stateTodo);

      if (stateTodo.isDefault === true) {
        throw error("Vous ne pouvez pas supprimer l'état par défaut.");
      } else if (todos.length > 0) {
        throw error("Vous ne pouvez pas supprimer cet état, il est associé à un todo.");
      } else {
        await saveStore(states.filter(todo => todo.id !== id));
      }
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
  async getAll(): Promise<StateTodoModel[]> {
    return await getPersistStateTodo();
  },
  async setDefault(id: number) {
    const store = await this.getAll();

    const stateTodo = store.find(x => x.id === id);
    if (stateTodo) {
      //les autres ne sont plus par défaut.
      for (const iterator of store) {
        iterator.isDefault = false;
      }
      stateTodo.isDefault = true;
      await saveStore(store);
    } else {
      throw error("L'identifiant de l'état n'existe pas.");
    }
  },
};
