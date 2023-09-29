import { ROOT_PATH } from "@common/config";
import { getIncrement } from "@common/model/WithId";
import { type StoreGetter } from "@common/store/IStore";
import { type TodoModel } from "@core/model/Todo";
import { error } from "console";
import { readFile, writeFile } from "fs/promises";
import path from "path";

import { type ITodoStore } from "./ITodoStore";

const STORE_FILE = path.resolve(ROOT_PATH, "src/store/todo/todo.json");

const getPersistTodo = async (): Promise<TodoModel[]> => {
  try {
    return JSON.parse(await readFile(STORE_FILE, "utf-8")) as TodoModel[];
  } catch (error) {
    return [];
  }
};

const saveStore = async (store: TodoModel[]): Promise<void> => {
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2));
};

export const fileTodoStore = (() =>
  ({
    async add(todo) {
      const store = await this.getAll();
      const id = getIncrement(store);
      store.push({ ...todo, id });
      await saveStore(store);
    },
    async changeState(newState, todos) {
      const store = await this.getAll();
      if (store.length > 0 && newState && todos.length > 0) {
        for (const iterator of todos) {
          const todo = store.find(x => x.value === iterator.value) ?? null;
          if (todo) {
            todo.state = newState;
          }
        }
      }

      await saveStore(store);
    },
    async remove(id) {
      const store = await getPersistTodo();
      await saveStore(store.filter(todo => todo.id !== id));
    },
    async getAll(): Promise<TodoModel[]> {
      return await getPersistTodo();
    },
    async getTodoByStateTodo(state): Promise<TodoModel[]> {
      if (state === undefined) {
        throw error("Le paramètre ne peut pas être vide.");
      }

      const todos = await this.getAll();
      const list: TodoModel[] = [];
      for (const iterator of todos) {
        if (iterator.state.id === state.id) {
          list.push(iterator);
        }
      }

      return list;
    },
  }) as ITodoStore) satisfies StoreGetter<ITodoStore>;
