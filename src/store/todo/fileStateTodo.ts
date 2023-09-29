import { ROOT_PATH } from "@common/config";
import { getIncrement } from "@common/model/WithId";
import { type StateTodoModel } from "@core/model/Todo";
import { readFile, writeFile } from "fs/promises";
import path from "path";

import { type ITodoStore } from "../../todo/store/ITodoStore";
import { type IStateTodoStore } from "./IStateTodoStore";

declare const fileTodoStore: ITodoStore;

const STORE_FILE = path.resolve(ROOT_PATH, "src/store/todo/stateTodo.json");

const storeStateTodo = async (): Promise<StateTodoModel[]> => {
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
    const store = await storeStateTodo();
    let stateTodo = store.find(x => x.isDefault === true);

    if (stateTodo === undefined) {
      stateTodo = store[0];
    }
    return stateTodo;
  },
  async add(stateTodo) {
    const store = await this.getAll();
    const id = getIncrement(store);
    store.push({ ...stateTodo, id });
    await saveStore(store);
  },
  async remove(id) {
    const stateTodos = await storeStateTodo();

    const stateTodo = stateTodos.find(x => x.id === id);

    if (stateTodo) {
      const todos = await fileTodoStore.getTodoByStateTodo(stateTodo);

      if (stateTodo.isDefault === true) {
        throw new Error("Vous ne pouvez pas supprimer l'état par défaut.");
      } else if (todos.length > 0) {
        throw new Error("Vous ne pouvez pas supprimer cet état, il est associé à un todo.");
      } else {
        await saveStore(stateTodos.filter(todo => todo.id !== id));
      }
    } else {
      throw new Error("L'identifiant de l'état n'existe pas.");
    }
  },
  async getAll(): Promise<StateTodoModel[]> {
    return await storeStateTodo();
  },
  async setDefault(id: number) {
    const stateTodos = await this.getAll();

    const stateTodo = stateTodos.find(x => x.id === id);
    if (stateTodo) {
      //les autres ne sont plus par défaut.
      for (const iterator of stateTodos) {
        iterator.isDefault = false;
      }
      stateTodo.isDefault = true;
      await saveStore(stateTodos);
    } else {
      throw new Error("L'identifiant de l'état n'existe pas.");
    }
  },
};
